import flatMap from 'lodash/flatMap';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  leaves,
  flattenSolutionTree,
  recursiveFilter
} from 'utils/builder';


const withModifiers = (nodes, selectedEnablings) => nodes.map(node => ({
  ...node,
  children: node.children ? withModifiers(node.children, selectedEnablings) : null,
  modifiers: node.children ?
    uniq(flatMap(node.children.map(n => n.modifiers))) :
    node.enablings.filter(enabling => enabling && selectedEnablings.includes(enabling.id)).map(enabling => enabling['assessment-value']),
}));

const transformBMEtree = (nodes, selectedSolution, selectedEnablings) => {
  const inSolution = (bme) => !selectedSolution || selectedSolution.bmes.filter(bme => bme).map(bme => bme.id).includes(bme.id);

  return withModifiers(recursiveFilter(nodes, inSolution), selectedEnablings);
};

const filterEnablings = (enablings, bmeTree) => {
  const availableEnablings = uniq(flatMap(leaves(bmeTree), bme => bme.enablings)).filter(enabling => enabling).map(enabling => enabling.id);
  const isAvailable = (enabling) => enabling && availableEnablings.includes(enabling.id);

  return recursiveFilter(enablings, isAvailable);
};

const transform = (nodes, selectedBMEs, commentedBMEs, selectedEnablings) => nodes.map(node => {
  const bmes = (node.bmes || []).filter(bme => selectedBMEs.includes(bme.id)).map(bme => ({
    ...bme,
    comment: commentedBMEs[bme.id],
    selectedEnablings: bme.enablings.filter(enabling => enabling && selectedEnablings.includes(enabling.id)),
  }));

  return {
    ...node,
    children: bmes.length > 0 ? bmes : transform(node.children || [], selectedBMEs, commentedBMEs, selectedEnablings),
  };
}).filter(node => node.level == "1" || node.children.length > 0);


const slice = (state, ownProps) => ownProps.businessModelId ? "existing" : "new";

const selectedProject = createSelector(
  [slice, state => state.builder, (_, ownProps) => ownProps.businessModelId],
  (slice, builder, businessModelId) => ({
    ...builder[slice],
    readonly: businessModelId && businessModelId === builder[slice].readableId,
  }),
);

const projectFieldSelector = (field) => createSelector(selectedProject, selectedProject => selectedProject[field]);

const commentedBMEs = projectFieldSelector('commentedBMEs');
const selectedEnablings = projectFieldSelector('selectedEnablings');
const selectedSolutionId = projectFieldSelector('selectedSolution');

const solutions = createSelector(
  [state => state.builderAPI.solutionCategories],
  flattenSolutionTree,
);

const selectedSolution = createSelector(
  [selectedSolutionId, solutions],
  (selectedSolutionId, solutions) => solutions.find(solution => solution.id === selectedSolutionId),
);

const selectedBMEs = createSelector(
  [projectFieldSelector('selectedBMEs'), selectedSolution],
  (selectedBMEs, selectedSolution) => (
    selectedSolution ?
    intersection(selectedBMEs, selectedSolution.bmes.filter(bme => bme).map(bme => bme.id)) :
    selectedBMEs
  ),
);

const bmeTree = createSelector(
  [state => state.builderAPI.bmeCategories, selectedSolution, selectedEnablings],
  transformBMEtree,
);

const filteredBmeTree = createSelector(
  [state => state.builderAPI.bmeCategories, selectedBMEs, commentedBMEs, selectedEnablings],
  transform,
);

const enablings = createSelector(
  [state => state.builderAPI.enablingCategories, bmeTree],
  filterEnablings,
);

export default createStructuredSelector({
  auth: state => state.auth,
  bmeTree,
  commentedBMEs,
  enablings,
  filteredBmeTree,
  project: selectedProject,
  selectedBMEs,
  selectedEnablings,
  selectedSolution,
  slice,
  solutions,
})

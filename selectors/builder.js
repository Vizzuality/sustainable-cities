import flatMap from 'lodash/flatMap';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  leaves,
  flattenSolutionTree,
  recursiveFilter
} from 'utils/builder';


export const withModifiers = (nodes, selectedEnablings) => nodes.map(node => ({
  ...node,
  children: node.children ? withModifiers(node.children, selectedEnablings) : null,
  modifiers: node.children ?
    uniq(flatMap(node.children.map(n => n.modifiers))) :
    node.enablings.filter(enabling => selectedEnablings.includes(enabling.id)).map(enabling => enabling['assessment-value']),
}));

const solutionFilteredBMEtree = (bmeTree, selectedSolution) => {
  const inSolution = (bme) => (
    !selectedSolution || selectedSolution.bmes.map(bme => bme.id).includes(bme.id)
  );

  return recursiveFilter(bmeTree, inSolution);
}

const filterEnablings = (enablings, bmeTree) => {
  const availableEnablings = uniq(flatMap(leaves(bmeTree), bme => bme.enablings)).map(enabling => enabling.id);
  const isAvailable = (enabling) => availableEnablings.includes(enabling.id);

  return recursiveFilter(enablings, isAvailable);
};

const normalizeNesting = (nodes) => nodes.map(node => ({
  ...node,
  children: normalizeNesting(node.children || node.bmes.map(bme => ({ ...bme, bme: true, children: [] }))),
}));


const withCustomBMEs = (nodes, customBMEs) => nodes.map(node => ({
  ...node,
  children: node.level === 3 ? node.children.concat(customBMEs.filter(bme => bme.category === node.id)) : withCustomBMEs(node.children, customBMEs),
}));

const withBMEcomments = (nodes, commentedBMEs) => nodes.map(node => ({
  ...node,
  comment: node.bme && commentedBMEs[node.id],
  children: withBMEcomments(node.children, commentedBMEs),
}));

const withSelectedEnablings = (nodes, selectedEnablings) => nodes.map(node => ({
  ...node,
  selectedEnablings: node.bme && node.enablings.filter(enabling => selectedEnablings.includes(enabling.id)),
  children: withSelectedEnablings(node.children, selectedEnablings),
}));

const filterBMEs = (nodes, selectedBMEs) => nodes.map(node => ({
  ...node,
  children: filterBMEs(node.children.filter(child => !child.bme || selectedBMEs.includes(child.id)), selectedBMEs),
}));

const pruneTree = (nodes, fn) => nodes.map(node => ({
  ...node,
  children: pruneTree(node.children, fn),
})).filter(fn);

const noop = (nodes) => nodes;

const buildCustomBMEs = (customBMEs) => customBMEs.map((bme, i) => ({
  ...bme,
  bme: true,
  private: true,
  enablings: [],
  children: [],
}));

const transform = (nodes, selectedBMEs, commentedBMEs, selectedEnablings, customBMEs) => (
  pruneTree(
    withBMEcomments(
      withSelectedEnablings(
        withCustomBMEs(
          filterBMEs(
            normalizeNesting(nodes),
            selectedBMEs),
          buildCustomBMEs(customBMEs)),
        selectedEnablings),
      commentedBMEs),
    node => node.level == "1" || node.bme || node.children.length > 0)
);

const slice = (state, ownProps) => ownProps.businessModelId ? "existing" : "new";

const selectedProject = createSelector(
  [slice, state => state.builder, (_, ownProps) => ownProps.businessModelId],
  (slice, builder, businessModelId) => ({
    ...builder[slice],
    readonly: businessModelId && businessModelId.slice(1) === builder[slice].readableId,
  }),
);

const projectFieldSelector = (field) => createSelector(selectedProject, selectedProject => selectedProject[field]);

const commentedBMEs = projectFieldSelector('commentedBMEs');
const selectedEnablings = projectFieldSelector('selectedEnablings');
const selectedSolutionId = projectFieldSelector('selectedSolution');
const customBMEs = projectFieldSelector('customBMEs');

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
    intersection(selectedBMEs, selectedSolution.bmes.map(bme => bme.id)) :
    selectedBMEs
  ),
);

const solutionFilteredBmeTree = createSelector(
  [state => state.builderAPI.bmeCategories, selectedSolution],
  solutionFilteredBMEtree,
);

const bmeTree = createSelector(
  [solutionFilteredBmeTree, selectedEnablings],
  withModifiers,
);

const filteredBmeTree = createSelector(
  [state => state.builderAPI.bmeCategories, selectedBMEs, commentedBMEs, selectedEnablings, customBMEs],
  transform,
);

const enablings = createSelector(
  [state => state.builderAPI.enablingCategories, bmeTree],
  filterEnablings,
);

const bmes = (state) => leaves(state.builderAPI.bmeCategories);

export const builderSelector = createStructuredSelector({
  auth: state => state.auth,
  solutionFilteredBmeTree,
  bmeTree,
  bmes,
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

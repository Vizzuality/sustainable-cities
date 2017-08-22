import { bindActionCreators } from 'redux';
import flatMap from 'lodash/flatMap';
import mapValues from 'lodash/mapValues';
import { SLICE_EXISTING, SLICE_NEW } from 'modules/builder';


export const leaves = (nodes) => {
  const children = flatMap(nodes, t => t.children || t.bmes || []);

  if (children.length > 0) {
    return leaves(children);
  }

  return nodes;
};

export const flattenSolutionTree = (solutions) => {
  const level2Solutions = flatMap(solutions, solution => solution.children);

  return level2Solutions.map(solution => ({
    ...solution,
    bmes: flatMap(solution.children, s => s.bmes),
  }));
};

export const recursiveFilter = (nodes, filterFn) => nodes.map(node => ({
  ...node,
  children: (
    node.children ?
    recursiveFilter(node.children, filterFn) :
    (node.enablings || node.bmes).filter(filterFn)
  )
})).filter(node => node.children.length > 0);

export const withSlice = (object) => (dispatch, props) => bindActionCreators(
  mapValues(object, (creator) => creator.bind(
    null,
    props.businessModelId ? SLICE_EXISTING : SLICE_NEW,
  )),
  dispatch,
);

import flatMap from 'lodash/flatMap';

export const leaves = (nodes) => {
  const children = flatMap(nodes, t => t.children || t.bmes || []);

  if (children.length > 0) {
    return leaves(children);
  } else {
    return nodes;
  }
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
  ),
})).filter(node => node.children.length > 0);

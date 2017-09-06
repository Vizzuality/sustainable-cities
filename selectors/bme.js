import { createSelector } from 'reselect';

// utils
import { sortByName } from 'utils/common';
import { listsBmesByCategory, listBmes } from 'utils/bme';

const getBmes = state => state.bme.list;
const getBmeFilters = state => state.bme.filters;

const getParsedBmes = createSelector(
  [getBmes, getBmeFilters],
  (bmes, filters) => {
    if (!bmes.length) return [];
    const bmeList = [];
    let bmeCategory = {};

    if (!filters.children) {
      bmes.forEach(p =>
        bmeList.push(...p.children)
      );
    }

    if (filters.children) {
      bmeCategory = ((bmes[0] || {}).children || []).find(b => b.slug === filters.children);
      if (bmeCategory) {
        bmeList.push(...bmeCategory.childrenBmes);
      }
    }

    (bmeList || []).sort(sortByName);

    return !filters.children ?
      listsBmesByCategory(bmeList, filters) :
      listBmes(bmeList, bmeCategory, filters);
  }
);

export { getParsedBmes };

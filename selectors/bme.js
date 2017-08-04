import { createSelector } from 'reselect';

// utils
import { listsBmesByCategory, listBmes } from 'utils/bme';

const getBmes = state => state.bme.list;
const getBmeFilters = state => state.bme.filters;

const getParsedBmes = createSelector(
  [getBmes, getBmeFilters],
  (bmes, filters) => {
    if (!bmes.length) return [];
    const bmeList = [];

    if (!filters.children) {
      bmes.forEach(p =>
        bmeList.push([...p.children])
    );
    }

    if (filters.children) {
      bmes.forEach(p =>
        bmeList.push([...p['children-bmes']])
      );
    }

    return !filters.children ?
      listsBmesByCategory(bmeList[0] || [], filters) :
      listBmes(bmeList[0] || []);
  }
);

export { getParsedBmes };

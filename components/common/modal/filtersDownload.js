import React from 'react';
import PropTypes from 'prop-types';

import TreeSelect from 'components/common/modal/TreeSelect';

export default function DownloadFilters({ bmes, cities, solutions, onChangeDropwdown, type }) {
  const cityLabel = type === 'projects' ? 'Located in' : 'Used in';
  return (
    <div className="filters">

      <div className="filter">
        <span className="c-text -fs-medium -fw-light">{cityLabel}</span>

        <TreeSelect
          className="c-text -fs-small -dark input-item"
          placeholder="All cities"
          data={cities}
          onChange={(currentNode, selectedNodes) => onChangeDropwdown('cities', selectedNodes)}
        />
      </div>

      {type === 'projects' &&
        <div className="filter">
          <span className="c-text -fs-medium -fw-light">Including elements from</span>
          <TreeSelect
            showDropdown
            placeholder="All categories"
            data={bmes}
            onChange={(currentNode, selectedNodes) => onChangeDropwdown('bmes', selectedNodes)}
          />
        </div>}

      <div className="filter">
        <span className="c-text -fs-medium -fw-light">Featuring solution</span>
        <TreeSelect
          className="c-text -fs-small -dark input-item"
          placeholder="All solutions"
          data={solutions}
          onChange={(currentNode, selectedNodes) => onChangeDropwdown('solutions', selectedNodes)}
        />
      </div>
    </div>
  );
}

DownloadFilters.propTypes = {
  type: PropTypes.string,
  cities: PropTypes.array,
  bmes: PropTypes.array,
  onChangeDropwdown: PropTypes.func.isRequired,
  solutions: PropTypes.array
};

DownloadFilters.defaultProps = {
  type: 'projects',
  cities: [],
  bmes: [],
  solutions: []
};

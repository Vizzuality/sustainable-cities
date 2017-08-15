import React from 'react';
import PropTypes from 'prop-types';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import isEqual from 'lodash/isEqual';

export default class DownloadFilters extends React.Component {

  shouldComponentUpdate(nextProps) {
    const bmesChanged = !isEqual(this.props.bmes, nextProps.bmes);
    const citiesChanged = !isEqual(this.props.cities, nextProps.cities);
    const solutionChanged = !isEqual(this.props.solutions, nextProps.solutions);

    return bmesChanged || citiesChanged || solutionChanged;
  }

  render() {
    const { bmes, cities, solutions, onChangeDropwdown } = this.props;
    return (
      <div className="filters">
        <span className="c-text -fs-medium -fw-light">Filtered by</span>

        <DropdownTreeSelect
          className="c-text -fs-small -dark input-item"
          placeholderText="All cities"
          data={cities}
          onChange={(currentNode, selectedNodes) => onChangeDropwdown('cities', selectedNodes)}
        />

        <DropdownTreeSelect
          className="c-text -fs-small -dark input-item"
          placeholderText="All business model element categories"
          data={bmes}
          onChange={(currentNode, selectedNodes) => onChangeDropwdown('bmes', selectedNodes)}
        />

        <DropdownTreeSelect
          className="c-text -fs-small -dark input-item"
          placeholderText="All solutions"
          data={solutions}
          onChange={(currentNode, selectedNodes) => onChangeDropwdown('solutions', selectedNodes)}
        />
      </div>
    );
  }
}

DownloadFilters.propTypes = {
  cities: PropTypes.array,
  bmes: PropTypes.array,
  onChangeDropwdown: PropTypes.func.isRequired,
  solutions: PropTypes.array
};

DownloadFilters.defaultProps = {
  cities: [],
  bmes: [],
  solutions: []
};

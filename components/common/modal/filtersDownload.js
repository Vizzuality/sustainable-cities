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
    console.log(this.props.bmes);
    const { bmes, cities, solutions, onChangeDropwdown } = this.props;
    const radio = 'projects';
    return (
      <div className="filters">
        <DropdownTreeSelect
          placeholderText={radio === 'projects' ? 'Any city' : 'Used in any city'}
          data={cities}
          onChange={(currentNode, selectedNodes) => onChangeDropwdown('cities', selectedNodes)}
        />

        <DropdownTreeSelect
          placeholderText={radio === 'projects' ?
            'Any business model element or category used' : 'All business model elements'}
          data={bmes}
          onChange={(currentNode, selectedNodes) => onChangeDropwdown('bmes', selectedNodes)}
        />

        <DropdownTreeSelect
          placeholderText={radio === 'projects' ?
            'Any solution' : 'Used in any solution'}
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

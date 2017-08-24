import React from 'react';
import PropTypes from 'prop-types';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import isEqual from 'lodash/isEqual';

export default class TreeSelect extends React.Component {

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.data, nextProps.data);
  }

  render() {
    const { className, data, placeholder, onChange, showDropdown } = this.props;

    return (
      <DropdownTreeSelect
        showDropdown={showDropdown}
        className={className}
        placeholderText={placeholder}
        data={data}
        onChange={(currentNode, selectedNodes) => onChange(currentNode, selectedNodes)}
      />
    );
  }
}

TreeSelect.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  showDropdown: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

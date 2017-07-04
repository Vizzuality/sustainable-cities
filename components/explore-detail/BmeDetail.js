import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

export default function BmeDetail(props) {
  const { isLoading, bme } = props;

  if (isLoading) {
    return (<div>Loading bme...</div>);
  }

  if (isEmpty(bme)) return null;
  const { name, description, categories } = bme;

  return (
    <div className="c-detail">
      <span>Name: {name}</span><br />
      <span>Description: {description}</span><br />
      <span>Categories: </span><br />
      {categories && categories.map(category =>
        <span key={category.id}>{category.name}<br /></span>)}
    </div>
  );
}

BmeDetail.propTypes = {
  isLoading: PropTypes.bool,
  bme: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
};

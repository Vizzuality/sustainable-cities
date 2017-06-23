import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

export default function ProjectDetail(props) {
  const { isLoading, project } = props;
  const { name, situation, solution, operationalYear, cities } = project;

  if (isLoading) {
    return (<div>Loading project...</div>);
  }

  if (isEmpty(project)) return null;

  return (
    <div className="c-project-detail">
      <span>Name: {name}</span><br />
      <span>operational Year: {operationalYear}</span><br />
      <span>Situation: {situation}</span><br />
      <span>Solution: {solution}</span><br />
      <span>City: {cities && cities[0] ? `${cities[0].name}-${cities[0].iso}` : '' }</span>
    </div>
  );
}

ProjectDetail.propTypes = {
  isLoading: PropTypes.bool,
  project: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
};

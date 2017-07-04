import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// components
import DetailSection from 'components/explore-detail/DetailSection';
import Itemization from 'components/explore-detail/Itemization';
import Cloud from 'components/explore-detail/Cloud';

// utils
import { getYearFromDateString } from 'utils/common';

export default function ProjectDetail(props) {
  const { isLoading, project } = props;

  if (isLoading) return (<div>Loading project...</div>);
  if (isEmpty(project)) return null;

  const { name, situation, solution, operationalYear, cities, externalSources, impacts } = project;
  const sourcesCloud = externalSources ?
    externalSources.map(source => ({ id: source.id, name: source.name, link: source.webUrl })) : [];
  const impactItems = impacts.map(impact => ({
    id: impact.id,
    name: impact.category ? impact.category.name : null,
    children: impact.category ? impacts.filter(imp => // eslint-disable-line no-confusing-arrow
      imp.category && impact.category ?
        imp.category.name === impact.category.name : false).map(i => ({
          id: i.id,
          name: `${i.impactUnit}: ${i.impactValue}`
        })) : []
  }));

  return (
    <div className="c-detail">
      <DetailSection
        title="Parameters"
      >
        <ul className="info-list">
          <li className="info-item"><span>Name: {name}</span></li>
          <li className="info-item"><span>Year (operational): {getYearFromDateString(operationalYear)}</span></li>
          <li className="info-item"><span>Country: {cities && cities[0] ? cities[0].iso : '' }</span></li>
          <li className="info-item"><span>City: {cities && cities[0] ? cities[0].name : '' }</span></li>
        </ul>
      </DetailSection>
      {situation && <DetailSection
        title="Situation"
      >
        <p>{situation}</p>
      </DetailSection>}

      {solution && <DetailSection
        title="What was done"
      >
        <p>{solution}</p>
      </DetailSection>}
      {sourcesCloud.length > 0 &&
        <DetailSection
          title="Where I can learn more?"
        >
          <Cloud
            clouds={sourcesCloud}
          />
        </DetailSection>}
      {impactItems.length > 0 &&
        <DetailSection
          title="What is the reported impact to date? (as of 2016)"
        >
          <Itemization
            items={impactItems}
          />
        </DetailSection>}
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

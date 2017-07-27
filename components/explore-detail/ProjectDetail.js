import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// components
import DetailSection from 'components/explore-detail/DetailSection';
import Itemization from 'components/explore-detail/Itemization';
import Cloud from 'components/explore-detail/Cloud';
import BmeTree from 'components/explore-detail/project/BmeTree';

// utils
import { getYearFromDateString } from 'utils/common';

export default function ProjectDetail({ project }) {
  const {
    name,
    situation,
    solution,
    operationalYear,
    cities,
    country,
    externalSources,
    impacts,
    bmeTree
  } = project;

  const sourcesCloud = externalSources ?
    externalSources.map(source => ({ id: source.id, name: source.name, link: source.webUrl })) : [];

  const impactItems = impacts.filter(i => !!i.category).map(impact => ({
    id: impact.id,
    name: impact.category.name,
    children: impacts.map(imp => ({ id: imp.id, name: `${imp.impactUnit}: ${imp.impactValue}` }))
  }));

  return (
    <div className='solution-detail'>
      <div className='row'>
        <div className='column-12 c-text -fs-huge -fw-thin'>
          Project Details
        </div>
      </div>

      <div className='solution-detail-main'>
        <DetailSection title='Snapshot'>
          <ul className='info-list'>
            <li className='info-item'><span>Name: {name}</span></li>
            <li className='info-item'><span>Year (operational): {getYearFromDateString(operationalYear)}</span></li>
            <li className='info-item'><span>Country: {country ? country.name : '' }</span></li>
            <li className='info-item'><span>City: {cities && cities[0] ? cities[0].name : '' }</span></li>
          </ul>
        </DetailSection>
      </div>

      <div className='solution-detail-rest'>

        {situation && <DetailSection title='Situation' background='white'>
          <p>{situation}</p>
        </DetailSection>}

        {solution && <DetailSection
          title='What was done'
        >
          <p>{solution}</p>
        </DetailSection>}
        {sourcesCloud.length > 0 &&
          <DetailSection
            title='Where I can learn more?'
          >
            <Cloud
              clouds={sourcesCloud}
            />
          </DetailSection>}
        {impactItems.length > 0 &&
          <DetailSection
            title='What is the reported impact to date? (as of 2016)'
          >
            <Itemization
              items={impactItems}
            />
          </DetailSection>}
        {bmeTree.length > 0 &&
          <BmeTree
            bmes={bmeTree}
          />}

      </div>
    </div>
  );
}

ProjectDetail.propTypes = {
  project: PropTypes.object.isRequired,
};

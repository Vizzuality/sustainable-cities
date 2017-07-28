import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// components
import DetailSection from 'components/explore-detail/DetailSection';
import Itemization from 'components/explore-detail/Itemization';
import ItemList from 'components/explore-detail/ItemList';
import BmeOverview from 'components/explore-detail/project/BmeOverview';

// utils
import { getYearFromDateString } from 'utils/common';

export default function ProjectDetail({ project }) {
  console.log(project);
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

  const sourcesList = externalSources ?
    externalSources.map(source => ({ id: source.id, name: source.name, link: source.webUrl })) : [];

  const impactItems = impacts.filter(i => !!i.category).map(impact => ({
    id: impact.id,
    name: impact.category.name,
    children: impacts.map(imp => ({ id: imp.id, name: `${imp.impactUnit}: ${imp.impactValue}` }))
  }));

  return (
    <div className='solution-detail'>
      <div className='row'>
        <div className='column large-12 c-text -fs-huge -fw-thin'>
          Project Details
        </div>
      </div>

      <div className='solution-detail-main'>
        <DetailSection title='Snapshot' contentSeparator={false}>
          <div className='row'>
            <div className='column large-6'>
              <div className='c-text -fs-big -fw-light'>
                Environmental impact
              </div>
              <div className='c-text'>
                WAITWHAT
              </div>
            </div>
            <div className='column large-6'>
              <div className='c-text -fs-big -fw-light'>
                Social impact
              </div>
              <div className='c-text'>
                WAITWHAT
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='column large-6'>
              <div className='c-text -fs-big -fw-light'>
                Other
              </div>
              <div className='c-text'>
                WAITWHAT
              </div>
            </div>
            <div className='column large-6'>
              <div className='c-text -fs-big -fw-light'>
                Highlighted BMEs
              </div>
              <div className='c-text'>
                WAITWHAT
              </div>
            </div>
          </div>
        </DetailSection>
      </div>

      <div className='solution-detail-rest'>

        <DetailSection title='Parameters' background='white'>
          <ul className='info-list'>
            <li className='info-item'>
              <b>Year (operational):</b>
              <span>{getYearFromDateString(operationalYear)}</span>
            </li>
            <li className='info-item'>
              <b>Region:</b>
              <span>{country ? country.regionName : '' }</span>
            </li>
            <li className='info-item'>
              <b>Country:</b>
              <span>{country ? country.name : '' }</span>
            </li>
            <li className='info-item'>
              <b>City:</b>
              <span>{cities && cities[0] ? cities[0].name : '' }</span>
            </li>
          </ul>
        </DetailSection>

        {situation && <DetailSection title='Situation' background='white'>
          <p>{situation}</p>
        </DetailSection>}

        {solution && <DetailSection
          title='What was done'
        >
          <p>{solution}</p>
        </DetailSection>}

        <DetailSection title='Key Actors' background='white'>
          <ul className='info-list'>
            <li className='info-item'>
              <b className='c-text -uppercase -fw-bold'>Public:</b>
              <span>WAITWHAT</span>
            </li>
            <li className='info-item'>
              <b className='c-text -uppercase -fw-bold'>Private:</b>
              <span>WAITWHAT</span>
            </li>
          </ul>
        </DetailSection>

        {impactItems.length > 0 &&
          <DetailSection
            title='What is the reported impact to date (as of 2016)'
          >
            <Itemization
              items={impactItems}
            />
          </DetailSection>}

        {sourcesList.length > 0 &&
          <DetailSection
            title='Where I can learn more?'
          >
            <ItemList
              items={sourcesList}
            />
          </DetailSection>}

        {bmeTree.length > 0 &&
          <DetailSection
            title='Business model elements overview'
            contentSeparator={false}
        >
          <BmeOverview
            projectId={project.id}
            bmes={bmeTree}
          />
        </DetailSection>}

      </div>
    </div>
  );
}

ProjectDetail.propTypes = {
  project: PropTypes.object.isRequired,
};

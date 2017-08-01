import React from 'react';
import PropTypes from 'prop-types';

// components
import DetailSection from 'components/explore-detail/DetailSection';
import ReportedImpact from 'components/explore-detail/ReportedImpact';
import ItemList from 'components/explore-detail/ItemList';
import BmeOverview from 'components/explore-detail/project/BmeOverview';
import HighlightedBmes from 'components/explore-detail/HighlightedBmes';

// utils
import { getYearFromDateString } from 'utils/common';

export default function SolutionDetail({ project }) {
  const {
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

  const impactItems = impacts.filter(i => !!i.category);

  return (
    <div className="solution-detail">
      <div className="row">
        <div className="column large-12 c-text -fs-huge -fw-thin">
          Project Details
        </div>
      </div>

      <div className="solution-detail-main">
        <DetailSection title="Highlights" contentSeparator={false}>
          <HighlightedBmes
            project={project}
          />
        </DetailSection>
      </div>

      <div className="solution-detail-rest">

        <DetailSection title="Parameters" background="white">
          <ul className="info-list">
            <li className="info-item">
              <b>Year (operational):</b>
              <span>{getYearFromDateString(operationalYear)}</span>
            </li>
            <li className="info-item">
              <b>Region:</b>
              <span>{country ? country.regionName : '' }</span>
            </li>
            <li className="info-item">
              <b>Country:</b>
              <span>{country ? country.name : '' }</span>
            </li>
            <li className="info-item">
              <b>City:</b>
              <span>{cities && cities[0] ? cities[0].name : '' }</span>
            </li>
          </ul>
        </DetailSection>

        {situation && <DetailSection title="Situation" background="white">
          <p>{situation}</p>
        </DetailSection>}

        {solution && <DetailSection
          title="What was done"
        >
          <p>{solution}</p>
        </DetailSection>}

        {/* <DetailSection title="Key Actors" background="white">
          <ul className="info-list">
            <li className="info-item">
              <b className="c-text -uppercase -fw-bold">Public:</b>
              <span>WAITWHAT</span>
            </li>
            <li className="info-item">
              <b className="c-text -uppercase -fw-bold">Private:</b>
              <span>WAITWHAT</span>
            </li>
          </ul>
        </DetailSection> */}

        {impactItems.length > 0 &&
          <DetailSection
            title="What is the reported impact to date (as of 2016)"
          >
            <ReportedImpact
              items={impactItems}
            />
          </DetailSection>}

        {sourcesList.length > 0 &&
          <DetailSection
            title="Where I can learn more?"
          >
            <ItemList
              items={sourcesList}
            />
          </DetailSection>}

        {bmeTree.length > 0 &&
          <DetailSection
            title="Business model elements overview"
            contentSeparator={false}
          >
            <BmeOverview
              projectId={project.id}
              bmeTree={bmeTree}
            />
          </DetailSection>}

      </div>
    </div>
  );
}

SolutionDetail.propTypes = {
  project: PropTypes.object.isRequired
};

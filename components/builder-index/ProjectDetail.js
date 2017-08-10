import React from 'react';

import DetailSection from 'components/explore-detail/DetailSection';
import { getYearFromDateString } from 'utils/common';


class ProjectDetail extends React.Component {
  render() {
    return (
      <div className="solution-detail">
        <div className="row">
          <div className="column large-12 c-text -fs-huge -fw-thin">
            Project Details
          </div>
        </div>

        <DetailSection title="Title" contentSeparator={false}>
          <textarea placeholder="Write here">{this.props.name}</textarea>
        </DetailSection>

        <DetailSection title="Parameters" contentSeparator={false}>
          <ul className="info-list">
            <li className="info-item">
              <b>Year (operational):</b>
              <span>{getYearFromDateString(this.props.operationalYear)}</span>
            </li>
            <li className="info-item">
              <b>Region:</b>
              <span>{this.props.country ? this.props.country.regionName : '' }</span>
            </li>
            <li className="info-item">
              <b>Country:</b>
              <span>{this.props.country ? this.props.country.name : '' }</span>
            </li>
            <li className="info-item">
              <b>City:</b>
              <span>{this.props.cities && this.props.cities[0] ? this.props.cities[0].name : '' }</span>
            </li>
          </ul>
        </DetailSection>

        <DetailSection title="Situation" contentSeparator={false}>
          <textarea placeholder="Write here">{this.props.situation}</textarea>
        </DetailSection>

        <DetailSection title="What was done" contentSeparator={false}>
          <textarea placeholder="Write here">{this.props.solution}</textarea>
        </DetailSection>
      </div>
    );
  }
}

export default ProjectDetail;

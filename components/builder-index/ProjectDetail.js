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
          <input
            type="text"
            className="input-text u-w-100"
            placeholder="Write here"
            value={this.props.fields.title}
            onChange={(e) => this.props.onFieldChange('title', e.target.value)}
          />
        </DetailSection>

        <DetailSection title="Description" contentSeparator={false}>
          <textarea
            placeholder="Write here"
            onChange={(e) => this.props.onFieldChange('description', e.target.value)}
          >
            {this.props.fields.description}
          </textarea>
        </DetailSection>
      </div>
    );
  }
}

export default ProjectDetail;

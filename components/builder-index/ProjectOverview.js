import React from 'react';
import PropTypes from 'prop-types';

import BmeOverview from 'components/builder-index/BmeOverview';
import OverviewSection from 'components/explore-detail/OverviewSection';
import RadialChart from 'components/common/RadialChart';

export default function ProjectOverview({ project }) {
  return (<div className="solution-overview">
    <div className="solution-overview-summary">
      <div className="row">
        <div className="column large-12 c-text -dark -fs-huge -fw-thin">
          Overview
        </div>
      </div>
      <div className="row">
        <div className="column large-8">
          <div className="c-detail-section">
            <div className="content">
              <BmeOverview
                bmeTree={project.bmeTree}
              />
            </div>
          </div>
        </div>
        <div className="column large-4">
          <RadialChart
            nodes={project.bmeTree}
            selected={[]}
            onClick={() => {}}
            keyPrefix="none"
            interactive={false}
            thumbnail={true}
          />
        </div>
      </div>
    </div>
  </div>);
}

ProjectOverview.propTypes = {
  project: PropTypes.object
};


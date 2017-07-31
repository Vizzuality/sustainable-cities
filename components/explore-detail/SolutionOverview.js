import React from 'react';
import PropTypes from 'prop-types';

import BmeOverview from 'components/explore-detail/project/BmeOverview';
import OverviewSection from 'components/explore-detail/OverviewSection';

export default function SolutionOverview({ project }) {
  return (<div className="solution-overview">
    <div className="solution-overview-summary">
      <div className="row">
        <div className="column large-12 c-text -fs-huge -fw-thin">
          Summary
        </div>
      </div>
      <div className="row">
        <div className="column large-12">
          <div className="c-detail-section">
            <div className="content">
              <BmeOverview
                projectId={project.id}
                bmes={project.bmeTree}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {project.bmeTree.map(bme => (<OverviewSection key={bme.id} bme={bme} />))}
  </div>);
}

SolutionOverview.propTypes = {
  project: PropTypes.object
};

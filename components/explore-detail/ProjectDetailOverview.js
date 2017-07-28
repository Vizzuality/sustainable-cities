import React from 'react';
import PropTypes from 'prop-types';

import BmeOverview from 'components/explore-detail/project/BmeOverview';
import OverviewSection from 'components/explore-detail/OverviewSection';

export default function ProjectDetailOverview({ project }) {
  return (<div className='solution-detail-overview'>
    <div className='solution-detail-overview-summary'>
      <div className='row'>
        <div className='column large-12 c-text -fs-huge -fw-thin'>
          Summary
        </div>
      </div>
      <div className='row'>
        <div className='column large-12'>
          <div className='c-detail-section'>
            <div className='content'>
              <BmeOverview projectId={project.id} bmes={project.bmeTree} itemWidth='25'  />
            </div>
          </div>
        </div>
      </div>
    </div>
    {project.bmeTree.map((bme) => (<OverviewSection key={bme.id} bme={bme} />))}
  </div>);
}

ProjectDetailOverview.propTypes = {

};

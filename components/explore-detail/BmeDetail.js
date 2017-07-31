import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

export default function BmeDetail({ bme }) {
  const enablingConditions = {
    successFactors: bme.enablings && bme.enablings.filter(e => e.assessmentValue === 'Success'),
    knownBarriers: bme.enablings && bme.enablings.filter(e => e.assessmentValue === 'Barrier')
  };

  return (<div className="bme-detail -fw-light">
    <div className="bme-detail-body">
      <div className="row">
        <div className="column large-4 c-title -fs-extrabig -fw-light">
          What it is & how does it work?
        </div>
        <div className="column large-8 c-text -fs-medium separator c-text -fw-light bme-description">
          {bme.description}
        </div>
      </div>
      <div className="row">
        <div className="column large-4 c-title -fs-extrabig -fw-light">
          Enabling conditions
        </div>
        <div className="column large-8 separator">
          <div className="row">
            <div className="column large-6">
              <div className="c-title -fs-bigger -fw-light">
                Success factors
              </div>
              <ul className="details">
                {enablingConditions.successFactors.length === 0 && (<li>
                  No success factors
                </li>)}
                {enablingConditions.successFactors.map(e => (<li key={e.id}>
                  {e.name}
                </li>))}
              </ul>
            </div>
            <div className="column large-6">
              <div className="c-title -fs-bigger -fw-light">
                Known barriers
              </div>
              <ul className="details">
                {enablingConditions.knownBarriers.length === 0 && (<li>
                  No known barriers
                </li>)}
                {enablingConditions.knownBarriers.map(e => (<li key={e.id}>
                  {e.name}
                </li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column large-4 c-title -fs-extrabig -fw-light">
          Projects that use it
        </div>
        {bme.projects.length === 0 && (<div className="column large-8 c-text -fs-medium separator">
          <div className="row">
            <div className="column large-9 c-title -fs-bigger -fw-light">
              No associated projects
            </div>
          </div>
        </div>)}
        {bme.projects.length > 0 && (<div className="column large-8 separator">
          {bme.projects.map(project => (<div className="project-content" key={project.id}>
            <div className="row">
              <div className="column large-9 c-title -fs-bigger -fw-light project-name">
                {project.name}
              </div>
              <div className="column large-3 project-link">
                <Button secondary link={`/solutions/${project.id}`}>See Project</Button>
              </div>
            </div>
            <div className="row">
              <div className="column large-12 c-title -fs-smaller project-city">
                {project.cities.length > 0 && (<span>
                  {project.cities[0].name}
                </span>)}
              </div>
            </div>
            <div className="row">
              <div className="column large-12 c-text project-description">
                {project.solution}
              </div>
            </div>
          </div>))}
        </div>)}
      </div>
      <div className="row">
        <div className="column large-4 c-title -fs-extrabig -fw-light">
          Where can I learn more?
        </div>
        <div className="column large-8 c-text -fw-light">
          <ul className="external-sources">
            {bme.externalSources.length === 0 && (<li>
              No external sources
            </li>)}
            {bme.externalSources.length > 0 && (bme.externalSources.map(s => (<li key={s.id}>
              {s.webUrl && (<a className="external" href={s.webUrl}>
                {s.name}
              </a>)}
              {!s.webUrl && (<span>
                {s.name}
              </span>)}
            </li>)))}
          </ul>
        </div>
      </div>
    </div>
  </div>);
}

BmeDetail.propTypes = {
  bme: PropTypes.object.isRequired
};

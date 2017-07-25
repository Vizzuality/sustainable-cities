import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Button from 'components/common/Button';

export default function BmeDetail(props) {

  const { isLoading, bme } = props;

  if (isLoading) {
    return (<div>Loading bme...</div>);
  }

  if (isEmpty(bme)) return null;

  const enablingConditions = {
    successFactors: bme.enablings && bme.enablings.filter((e) => e.assessmentValue === 'Success'),
    knownBarriers: bme.enablings && bme.enablings.filter((e) => e.assessmentValue === 'Barrier'),
  };

  return (<div className='bme-detail'>
    <div className='bme-detail-body'>
      <div className='row'>
        <div className='column large-4 title extrabig'>
          What it is & how does it work?
        </div>
        <div className='column large-8 content separator'>
          {bme.description}
        </div>
      </div>
      <div className='row'>
        <div className='column large-4 title extrabig'>
          Enabling conditions
        </div>
        <div className='column large-8 separator'>
          <div className='row'>
            <div className='column large-6 content'>
              <div className='title extrabig'>
                Success factors
              </div>
              <ul className='details'>
                {enablingConditions.successFactors.length === 0 && (<li>
                  No success factors
                </li>)}
                {enablingConditions.successFactors.map((e) => (<li key={e.id}>
                  {e.name}
                </li>))}
              </ul>
            </div>
            <div className='column large-6'>
              <div className='title extrabig'>
                Known barriers
              </div>
              <div className='content'>
                <ul className='details'>
                  {enablingConditions.knownBarriers.length === 0 && (<li>
                    No known barriers
                  </li>)}
                  {enablingConditions.knownBarriers.map((e) => (<li key={e.id}>
                    {e.name}
                  </li>))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='column large-4 title extrabig'>
          Projects that use it
        </div>
        {bme.projects.length === 0 && (<div className='column large-8 content separator'>
          <div className='row'>
            <div className='column large-9 title huge'>
              no associated projects
            </div>
          </div>
        </div>)}
        {bme.projects.length > 0 && (<div className='column large-8 content separator'>
          {bme.projects.map((project) => (<div className='project-content' key={project.id}>
            <div className='row'>
              <div className='column large-9 title extrabig'>
                {project.name}
              </div>
              <div className='column large-3 align-right'>
                <Button secondary link={`/projects/${project.id}`}>See Project</Button>
              </div>
            </div>
            <div className='row'>
              <div className='column large-12 title smaller city'>
                {project.cities.length > 0 && (<span>
                  {project.cities[0].name}
                </span>)}
              </div>
            </div>
            <div className='row'>
              <div className='column large-12 details'>
                {project.solution}
              </div>
            </div>
          </div>))}
        </div>)}
      </div>
      <div className='row'>
        <div className='column large-4 title extrabig'>
          Where can I learn more?
        </div>
        <div className='column large-8 content'>
          <ul className='external-sources'>
            {bme.externalSources.length === 0 && (<li>
              no external sources
            </li>)}
            {bme.externalSources.length > 0 && (bme.externalSources.map((s) => (<li key={s.id}>
              {s.webUrl && (<a className='external' href={s.webUrl}>
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
    <div className='bme-detail-related-content'>
      <div className='row'>
        <div className='column large-12 title huge'>
          Related Content
        </div>
      </div>
    </div>
    <div className='bme-detail-download-data inverted'>
      <div className='bme-detail-download-data-content'>
        <div className='row'>
          <div className='column large-12 title huge'>
            Download Data
          </div>
        </div>
        <div className='row'>
          <div className='column large-12 content'>
            <p>Lorem ipsum cras mattis consectetur purus sit amet fermentum.</p>
            <p>Praesent commodo cursus magna, vel scelerisque.</p>
          </div>
        </div>
        <div className='row'>
          <div className='column large-12'>
            <Button className='download-button' secondary>select data</Button>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

BmeDetail.propTypes = {
  isLoading: PropTypes.bool,
  bme: PropTypes.object.isRequired
};

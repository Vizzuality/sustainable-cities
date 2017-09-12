import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';
import ItemList from 'components/explore-detail/ItemList';

export default function BmeDetail({ bme, print }) {
  return (<div className="bme-detail -fw-light">
    <div className="bme-detail-body">
      <div className="row">
        <div className="column small-12 large-4 c-title -fs-extrabig -fw-light">
          What it is & how does it work?
        </div>
        <div className="column small-12 large-8 c-text -fs-medium separator c-text -fw-light bme-description">
          {bme.description}
        </div>
      </div>
      <div className="row">
        <div className="column small-12 large-4 c-title -fs-extrabig -fw-light">
          Enabling conditions
        </div>
        <div className="column small-12 large-8 separator">
          <div className="row">
            <div className="column small-12">
              {(bme.enablings || []).length > 0 ?
                <ItemList
                  items={bme.enablings.map(enabling => ({ id: enabling.id, name: enabling.name }))}
                /> : <span className="c-text -fs-default -fw-light">No enabling conditions found</span>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column small-12 large-4 c-title -fs-extrabig -fw-light">
          Examples of projects that use it
        </div>
        {bme.projects.length === 0 && (<div className="column small-12 large-8 c-text -fs-medium separator">
          <div className="row">
            <div className="column small-12 large-9 c-title -fs-default -fw-light">
              No associated projects
            </div>
          </div>
        </div>)}
        {bme.projects.length > 0 && (<div className="column small-12 large-8 separator">
          {bme.projects.map(project => (<div className="project-content" key={project.id}>
            <div className="row">
              <div className="column small-8 large-9 c-title -fs-bigger -fw-light project-name">
                {project.name}
              </div>
              {!print &&
                <div className="column small-4 large-3 project-link">
                  <Button secondary link={`/solutions/${project.id}`}>See Project</Button>
                </div>}
            </div>
            <div className="row">
              <div className="column small-12 large-12 c-title -fs-smaller project-city">
                {(project.cities || []).length > 0 && (<span>
                  {project.cities[0] && project.cities[0].name}
                </span>)}
              </div>
            </div>
            <div className="row">
              <div className="column small-12 large-12 c-text -fs-medium -fw-light project-description">
                {project.solution}
              </div>
            </div>
          </div>))}
        </div>)}
      </div>
      <div className="row">
        <div className="column small-12 large-4 c-title -fs-extrabig -fw-light">
          Where can I learn more?
        </div>
        <div className="column small-12 large-8 c-text -fw-light">
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
  bme: PropTypes.object.isRequired,
  print: PropTypes.bool
};

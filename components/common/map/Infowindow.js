import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

export default function Infowindow(props) {
  const _setProjects = (projects = []) =>
    <ul className="info-list">
      {projects.map(project =>
        <li className="info-item" key={project.id}>
          <Link route="solution-detail" params={{ id: project.id }}>
            <a>{project.name}</a>
          </Link>
        </li>)}
    </ul>;

  const _setBmes = (bmes = []) => {
    const { category, subCategory, children } = props.filters || {};
    const selectedBmes = (children) ? ((bmes[0] || {}).children || []) : bmes;

    return (
      <ul className="info-list">
        {selectedBmes.map(bme =>
          <li className="info-item" key={bme.id}>
            <Link
              route={children ? 'bme-detail' : 'explore-index'}
              params={children ? {
                id: bme.id
              } : {
                category,
                subCategory: subCategory !== undefined ? subCategory : bme.slug,
                children: subCategory !== undefined ? bme.slug : null
              }}
            >
              {children ?
                <a>{bme.name}</a> :
                <a>{bme.quantity} {bme.name}</a> }
            </Link>
          </li>)}
      </ul>);
  };

  const _getTotalBmes = (bmes = []) => {
    let totalQuantities = 0;

    bmes.forEach((bme) => {
      totalQuantities += bme.quantity;
    });

    return totalQuantities;
  };

  const _setContent = () => {
    let content = null;
    const { type } = props;

    switch (type) {
      case 'solution': {
        const { projects, name } = props;
        content = (
          <div className="infowindow-content">
            <h3 className="c-title -fs-big -fw-light -light">{name}</h3>
            <span className="resume-items">{(projects || []).length} projects:</span>
            {_setProjects(projects)}
          </div>
        );
        break;
      }
      case 'bme': {
        const { id, name, projects, filters } = props;
        const { bmesQuantity } = projects[0] ? projects[0].cities[0] : {};
        const { category, subCategory, children } = filters || {};
        let bmes = [];
        let currentBme = {};

        if (category) {
          currentBme = (bmesQuantity || []).find(bme => bme.slug === category);
          if (currentBme && Object.keys(currentBme).length) {
            bmes = currentBme.children;
          }
        }

        if (subCategory) {
          currentBme = (bmes || []).find(bme => bme.slug === subCategory);
          if (currentBme && Object.keys(currentBme).length) {
            bmes = currentBme.children;
          }
        }

        if (children) {
          currentBme = (bmes || []).find(bme => bme.slug === children);
          if (currentBme && Object.keys(currentBme).length) {
            bmes = [currentBme];
          }
        }

        bmes = (bmes || []).filter(bme => bme.quantity);
        const totalElements = (children) ? ((bmes[0] || {}).children || []).length : _getTotalBmes(bmes);

        content = (
          <div className="infowindow-content">
            <Link
              route="city-detail"
              params={{
                id
              }}
            >
              <h3 className="c-title -fs-big -fw-light -light">
                <a>{name}</a>
              </h3>
            </Link>
            <span className="resume-items">{totalElements} {totalElements > 1 ? 'elements' : 'element'}:</span>
            {_setBmes(bmes)}
          </div>
        );
        break;
      }
      case 'city': {
        const { projects, name, id } = props;
        content = (
          <div className="infowindow-content">
            <Link
              route="city-detail"
              params={{
                id
              }}
            >
              <h3 className="c-title -fs-big -fw-light -light">
                <a>{name}</a>
              </h3>
            </Link>

            <span className="resume-items">{(projects || []).length} projects:</span>
            {_setProjects(projects)}
          </div>
        );
        break;
      }
      default:
        content = null;
    }

    return content;
  };

  return (
    <div className="c-infowindow">
      {_setContent()}
    </div>
  );
}

Infowindow.propTypes = {
  filters: PropTypes.array // eslint-disable-line react/no-unused-prop-types
};

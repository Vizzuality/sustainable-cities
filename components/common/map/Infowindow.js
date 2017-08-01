import React from 'react';
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

  const _setContent = () => {
    let content = null;
    const { type } = props;

    switch (type) {
      case 'solution': {
        const { projects, name } = props;
        content = (
          <div className="infowindow-content">
            <h3 className="c-title -fs-extrabig -fw-light -light">{name}</h3>
            <span className="resume-items">{(projects || []).length} projects:</span>
            {_setProjects(projects)}
          </div>
        );
        break;
      }
      case 'bme': {
        const { name, projects } = props;
        // const { category, subCategory } = filters;
        // let categoryObject = {};
        // // let categoryName = '';
        // // const cityName = projects[0] && projects[0].cities[0] ?
        // //   projects[0].cities[0].name : '-';

        // if (!subCategory) {
        //   categoryObject = categories.find(cat => cat.slug === category) || {};
        //   // categoryName = categoryObject.name;
        // }

        // if (subCategory) {
        //   const parentObject = categories.find(cat => cat.slug === category) || {};
        //   categoryObject = (parentObject.children || [])
        //     .find(child => child.slug === subCategory) || {};
        // }
        // categoryName = categoryObject.name;

        content = (
          <div className="infowindow-content">
            <h3 className="c-title -fs-extrabig -fw-light -light">{name}</h3>
            <span className="resume-items">{`${projects.length} projects:`}</span>
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

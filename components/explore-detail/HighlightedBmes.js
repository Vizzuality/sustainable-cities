import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import groupBy from 'lodash/groupBy';

export default function HighlightedBmes({ project, bmes }) {
  // group highlighted bmes
  const groupedHighlightedBmes = groupBy(bmes, projectBme =>
    projectBme.bme && projectBme.bme.categoryLevel1);

  return (<div className="c-highlighted-bmes">
    {Object.keys(groupedHighlightedBmes).map((categoryLevel1) => {
      const topLevelCategory = project.bmeTree.find(category => category.name === categoryLevel1);
      return topLevelCategory && (<div key={topLevelCategory.id} className="c-highlighted-bmes-item">
        <div className="c-text -dark -fs-big -fw-light">
          {topLevelCategory.name}
        </div>
        <ul>
          {groupedHighlightedBmes[categoryLevel1].map(highlightedBme => (
            <li key={highlightedBme.id}>
              <Link route={`/solutions/${project.id}/${topLevelCategory.slug}#${highlightedBme.bme.slug}`}>
                <a>{highlightedBme.bme.name}</a>
              </Link>
            </li>))}
        </ul>
      </div>);
    })}
  </div>);
}

HighlightedBmes.propTypes = {
  project: PropTypes.object.isRequired,
  bmes: PropTypes.object
};

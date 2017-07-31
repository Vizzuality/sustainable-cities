import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

export default function BmeOverview({ projectId, bmeTree }) {
  return (
    <div className="c-bme-overview">
      {bmeTree.map((bme) => {
        const titleColor = CATEGORY_FIRST_LEVEL_COLORS[bme.slug] ||
          CATEGORY_FIRST_LEVEL_COLORS.default;

        return (<div className="c-bme-overview-item" key={bme.id}>
          <div className="c-bme-overview-strip" style={{ backgroundColor: titleColor }} />
          <Link route="solution-detail" params={{ id: projectId, subPage: bme.slug }}>
            <a className="c-text -fs-extrabig -fw-light">{bme.name}</a>
          </Link>
          <ul className="c-text -fs-extrasmall -uppercase -fw-light">
            {bme.children.length === 0 && (<li className="c-text -fs-extrasmall -uppercase -fw-light">
              <span>
                n/a
              </span>
            </li>)}
            {bme.children.length > 0 && bme.children.map(child => (<li key={child.id}>
              <Link route={`/solutions/${projectId}/${bme.slug}#${child.slug}`}>
                <a>
                  {child.name}
                </a>
              </Link>
            </li>))}
          </ul>
        </div>);
      })}
    </div>
  );
}

BmeOverview.propTypes = {
  projectId: PropTypes.string.isRequired,
  bmeTree: PropTypes.array.isRequired
};

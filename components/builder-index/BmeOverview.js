import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

export default function BmeOverview({ bmeTree }) {
  return (
    <div className="c-bme-overview">
      {bmeTree.map((bme) => {
        const titleColor = CATEGORY_FIRST_LEVEL_COLORS[bme.slug] ||
          CATEGORY_FIRST_LEVEL_COLORS.default;

        return (
          <div className="c-bme-overview-item" key={bme.id}>
            <div className="c-bme-overview-strip" style={{ backgroundColor: titleColor }} />
            <p className="c-text -fs-extrabig -fw-light">{bme.name}</p>

            <ul className="c-text -fs-extrasmall -uppercase -fw-light">
              {bme.children.length === 0 && (<li className="c-text -fs-extrasmall -uppercase -fw-light">
                <span>
                  n/a
                </span>
              </li>)}
              {bme.children.map(c => c.children).reduce((a,b) => a.concat(b), []).map(c => c.children).reduce((a,b) => a.concat(b), []).map(child => (<li key={child.id}>
                {child.name}
              </li>))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

BmeOverview.propTypes = {
  bmeTree: PropTypes.array.isRequired
};


import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';

import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

export default function BmeOverview({ projectId, bmes, itemWidth }) {
  return (
    <div className="c-bme-overview">
      {bmes.map((bme) => {

        let titleColor = CATEGORY_FIRST_LEVEL_COLORS[bme.slug] || CATEGORY_FIRST_LEVEL_COLORS.default;

        return (<div className={`c-bme-overview-item-${itemWidth}`} key={bme.id}>
          <div className="c-bme-overview-strip" style={{ backgroundColor: titleColor }} />
          <Link route='solution-detail' params={{ id: projectId, subPage: bme.slug }}>
            <a className="c-text -fs-extrabig -fw-light">{bme.name}</a>
          </Link>
          <ul className="c-text -fs-extrasmall -uppercase -fw-light">
            {bme.children.length === 0 && (<li className='c-text -uppercase'>n/a</li>)}
            {bme.children.length > 0 && bme.children.map((child) => (<li key={child.id}>
              {child.name}
            </li>))}
          </ul>
        </div>)
      })}
    </div>
  );
}

BmeOverview.propTypes = {
  projectId: PropTypes.string.isRequired,
  bmes: PropTypes.array,
  itemWidth: PropTypes.oneOf(['25', '50'])
};

BmeOverview.defaultProps = {
  bmes: [],
  itemWidth: '50'
};
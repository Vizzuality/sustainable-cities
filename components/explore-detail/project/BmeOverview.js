import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function BmeOverview({ bmes }) {
  return (
    <div className="c-bme-overview">
      {bmes.map((bme, n) => (<div className="c-bme-overview-item" key={bme.id}>
        <div className={classnames("c-bme-overview-strip", `c-color-${n % 4}`)} />
        <div className="c-text -fs-extrabig -fw-light">{bme.name}</div>
        <ul className="c-text -fs-extrasmall -uppercase -fw-light">
          {bme.children.length === 0 && (<li className='c-text -uppercase'>n/a</li>)}
          {bme.children.length > 0 && bme.children.map((child) => (<li key={child.id}>
            {child.name}
          </li>))}
        </ul>
      </div>))}
    </div>
  );
}

BmeOverview.propTypes = {
  bmes: PropTypes.array
};

BmeOverview.defaultProps = {
  bmes: []
};

import React from 'react';
import Proptypes from 'prop-types';

export default function Cloud(props) {
  return (
    <div className="c-cloud">
      <ul className="cloud-list">
        {props.clouds.map(cloud =>
          <li className="cloud-item" key={cloud.id}>
            <a href={cloud.link} className="cloud-link"target="_blank" rel="noopener noreferrer">{cloud.name}</a>
          </li>
        )}
      </ul>
    </div>
  );
}

Cloud.propTypes = {
  clouds: Proptypes.array
};

Cloud.defaultProps = {
  clouds: []
};

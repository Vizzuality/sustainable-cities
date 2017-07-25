import React from 'react';
import PropTypes from 'prop-types';

const getBmeItem = bme => (
  <li
    key={bme.id}
    className="bme-description-item"
  >
    <h3 className="bme-title">{bme.name}</h3>
    <h4 className="bme-category">{bme.category}</h4>
    <p>{bme.description}</p>
  </li>
);

export default function BmeDescriptionList(props) {
  return (
    <div className="c-bme-description-list">
      <ul className="bme-description-list">
        {props.bmes.map(bme => getBmeItem(bme))}
      </ul>
    </div>
  );
}

BmeDescriptionList.propTypes = {
  bmes: PropTypes.array
};

BmeDescriptionList.defaultProps = {
  bmes: []
};

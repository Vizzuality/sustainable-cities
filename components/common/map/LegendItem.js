import React from 'react';
import PropTypes from 'prop-types';
// import Spinner from '../Spinner';

export default function LegendItem(props) {
  const { item } = props;
  return (
    <li className="c-legend-item">
      {item.title}
    </li>
  );
}

LegendItem.propTypes = {
  item: PropTypes.object
  // text: PropTypes.string,
  // filters: PropTypes.object
};

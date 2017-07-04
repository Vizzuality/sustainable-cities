import React from 'react';
import PropTypes from 'prop-types';

export default function DetailSection(props) {
  return (
    <div className="c-detail-section">
      <div className="row">
        <div className="column small-4">
          <h2 className="section-title">{props.title}</h2>
        </div>
        <div className="column small-8">
          <div className="content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

DetailSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

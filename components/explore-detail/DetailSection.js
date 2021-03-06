import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function DetailSection(props) {
  return (
    <div
      className={classnames('c-detail-section', {
        '-content-separator': props.contentSeparator,
        '-content-padding': props.contentPadding,

      })}
      id={props.type}
    >
      <div className="row">
        <div className="column small-12 medium-4">
          <h2 className="c-title -dark -fs-extrabig -fw-light">
            {props.title}
          </h2>
        </div>
        <div className="column small-12 medium-8">
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
  contentSeparator: PropTypes.bool,
  contentPadding: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

DetailSection.defaultProps = {
  contentSeparator: true,
  contentPadding: true
};

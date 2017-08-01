import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Cover(props) {
  return (
    <div
      className={classnames(
        'c-cover',
        `-size-${props.size}`,
        `-position-${props.position}`,
        props.className
      )}
      style={props.image && { backgroundImage: `url(${props.image})` }}
    >
      <div className="c-cover-veil">
        <div className="row align-bottom">
          <div className="column large-8">
            { props.breadcrumbs && <div className="breadcrumbs">{props.breadcrumbs}</div> }
            <h1 className="c-title -light -fs-huge -fw-thin">{props.title}</h1>
            { props.description && <p className="description">{props.description}</p> }
          </div>
          <div className="column large-4">
            <div className={classnames('actions', { '-margin': !props.description })}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cover.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'short', 'shorter']),
  position: PropTypes.oneOf(['top', 'bottom']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  breadcrumbs: PropTypes.PropTypes.element, // Breadcrumbs component expected
  children: PropTypes.any
};

Cover.defaultProps = {
  size: 'normal',
  position: 'top',
};

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
      style={{
        backgroundImage: props.image ? `url(${props.image})` : undefined,
        backgroundColor: props.color || undefined
      }}
    >
      <div className="c-cover-veil">
        <div className="row align-bottom">
          <div className="column small-12 large-8">
            { props.breadcrumbs && <div className="breadcrumbs">{props.breadcrumbs}</div> }
            <h1 className="c-title -light -fs-huge -fw-thin">
              { props.titleIcon && <svg viewBox="0 0 32 32">
                <use height="100%" xlinkHref={`#${props.titleIcon}`} />
              </svg> }
              {props.title}
            </h1>
            { props.description && <p className="c-text -fs-medium -fw-light description">{props.description}</p> }
          </div>
          <div className="column small-12 large-4">
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
  color: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'short', 'shorter']),
  position: PropTypes.oneOf(['top', 'bottom']),
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.string,
  description: PropTypes.string,
  breadcrumbs: PropTypes.PropTypes.element, // Breadcrumbs component expected
  children: PropTypes.any
};

Cover.defaultProps = {
  size: 'normal',
  position: 'top'
};

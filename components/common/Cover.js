import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Breadcrumbs from 'components/common/Breadcrumbs';

export default function Cover(props) {
  return (
    <div
      className={classnames('c-cover', `-${props.size}`)}
      style={props.image && { backgroundImage: `url(${props.image})` }}
    >
      <div className="row align-bottom">
        <div className="column large-8">
          { props.breadcrumbs && <div className="breadcrumbs">{props.breadcrumbs}</div> }
          <h1>{props.title}</h1>
          { props.description && <p className="description">{props.description}</p> }
        </div>
        <div className="column large-4">
          <div className={classnames('actions', { '-margin': !props.description })}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

Cover.propTypes = {
  image: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'short']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  breadcrumbs: PropTypes.instanceOf(Breadcrumbs),
  children: PropTypes.any
};

Cover.defaultProps = {
  size: 'normal'
};

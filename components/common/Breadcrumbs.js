import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import uuidv1 from 'uuid/v1';

export default function Breadcrumbs(props) {
  const renderItem = (item = {}) => {
    const { name, route, params, title, noLink } = item;
    if (title) {
      return (<h2 className="c-title -dark -fs-huge -fw-thin">{name}</h2>);
    }

    if (noLink) {
      return (<span>{name}</span>);
    }

    return (
      <Link route={route} params={params}>
        <a>{name}</a>
      </Link>);
  };

  return (
    <ul className="c-breadcrumbs">
      {props.items.map((item) => { // eslint-disable-line arrow-body-style
        return (
          <li
            key={uuidv1()}
            className={classnames('breadcrumbs-item', {
              '-title': item.title
            })}
          >
            {renderItem(item)}
          </li>
        );
      })}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      route: PropTypes.string,
      params: PropTypes.object,
      noLink: PropTypes.bool
    })
  )
};

Breadcrumbs.defaultProps = {
  items: []
};

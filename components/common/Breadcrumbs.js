import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import uuidv1 from 'uuid/v1';

export default function Breadcrumbs(props) {
  return (
    <ul className="c-breadcrumbs">
      {props.items.map((item) => { // eslint-disable-line arrow-body-style
        return (
          <li key={uuidv1()}>
            {!item.noLink ? <Link route={item.route} params={item.params}>
              <a>{item.name}</a>
            </Link> : <span>{item.name}</span>}
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

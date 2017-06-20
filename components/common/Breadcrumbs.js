import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

export default function Breadcrumbs(props) {
  return (
    <ul className="c-breadcrumbs">
      {props.items.map((item) => { // eslint-disable-line arrow-body-style
        return (
          <li key={item.name}>
            <Link route={item.route} params={item.params}>
              <a>
                {item.name}
              </a>
            </Link>
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
      route: PropTypes.string.isRequired,
      params: PropTypes.object
    })
  )
};

Breadcrumbs.defaultProps = {
  items: []
};

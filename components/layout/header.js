import React from 'react';
import PropTypes from 'prop-types';

// Components
import MainNav from 'components/common/MainNav';

export default function Header(props) {
  return (
    <header className="c-header">
      <MainNav
        route={props.queryParams.route}
      />
    </header>
  );
}

Header.propTypes = {
  queryParams: PropTypes.object
};

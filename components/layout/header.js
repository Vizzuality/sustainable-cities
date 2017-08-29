import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

// constants
import { BREAKPOINT_TABLET } from 'constants/responsive';

// Components
import MainNav from 'components/common/MainNav';
import MobileHeader from 'components/common/MobileHeader';

export default function Header(props) {
  return (
    <header className="c-header">

      <MediaQuery maxWidth={BREAKPOINT_TABLET}>
        <MobileHeader
          route={props.queryParams.route}
        />
      </MediaQuery>

      <MediaQuery minWidth={BREAKPOINT_TABLET + 1}>
        <MainNav
          route={props.queryParams.route}
        />
      </MediaQuery>

    </header>
  );
}

Header.propTypes = {
  queryParams: PropTypes.object
};

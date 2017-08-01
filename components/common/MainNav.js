import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import TetherComponent from 'react-tether';

// components
import SubMenu from 'components/common/SubMenu';

// constants
import { EXPLORE_TABS, EXPLORE_ROUTES } from 'constants/explore';

export default class MainNav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      section: ''
    };
  }

  onSelectSection(e, section) {
    if (e) e.preventDefault();
    const currentSection = this.state.section;
    if (currentSection === section) return;

    this.setState({
      section
    });
  }

  onCloseSubMenu() {
    this.setState({
      section: ''
    });
  }

  render() {
    const { route, logged, username } = this.props;
    const { section } = this.state;

    return (
      <div className="c-main-nav">
        <div className="row">
          <div className="nav-container">
            <div className="logo">
              <Link prefetch route="home">
                <a>Financing <br/> Sustainable <br/> Cities</a>
              </Link>
            </div>
            <nav className="nav">
              <ul className="nav-list" role="menubar">
                <li
                  className={classnames('nav-item', { '-current': route === 'about' })}
                  role="menuitem"
                >
                  <Link prefetch route="about"><a className="literal">About</a></Link>
                </li>
                <li
                  className={classnames('nav-item', { '-current': EXPLORE_ROUTES.indexOf(route) !== -1 })}
                  role="menuitem"
                >
                  <Link prefetch route="explore-index"><a className="literal">Solutions map</a></Link>
                </li>
                <li
                  className={classnames('nav-item', { '-current': route === 'builder' })}
                  role="menuitem"
                >
                  <Link prefetch route="builder"><a className="literal">Design</a></Link>
                </li>
                <li className="nav-item" role="menuitem">
                  <a href="username" className="username">{username}</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

MainNav.propTypes = {
  route: PropTypes.string,
  logged: PropTypes.bool,
  username: PropTypes.string
};

MainNav.defaultProps = {
  logged: false,
  username: 'Log in'
};

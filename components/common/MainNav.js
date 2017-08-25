import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import { connect } from 'react-redux';
import TetherComponent from 'react-tether';
import uuidv1 from 'uuid/v1';

// modules
import { logout } from 'modules/auth';

// components
import SubMenu from 'components/common/SubMenu';
import Login from 'components/common/Login';
import SignUp from 'components/common/SignUp';

const SOLUTION_MAP_ROUTES = ['explore-index', 'solution-detail', 'bme-detail', 'city-detail'];


class MainNav extends React.Component {
  state = {
    section: '',
    modal: null
  };

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

  showLogin(e) {
    e.stopPropagation();
    this.setState({ modal: 'login', section: '' });
  }

  showSignUp() {
    this.setState({ modal: 'sign-up', section: '' });
  }

  hideModals() {
    this.setState({ modal: null });
  }

  render() {
    const { route, token, profile } = this.props;
    const { modal, section } = this.state;
    const { name } = profile || {};

    const profileSubmenu = [
      { id: uuidv1(), label: 'See profile' },
      { id: uuidv1(), label: 'Log out', onClick: () => { this.props.logout(); } }
    ];

    return (
      <div className="c-main-nav">
        <div className="row">
          <div className="column small-12">
            <div className="nav-container">
              <div className="logo">
                <Link prefetch route="home">
                  <a>Financing <br /> Sustainable <br /> Cities</a>
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
                    className={classnames('nav-item', { '-current': SOLUTION_MAP_ROUTES.indexOf(route) !== -1 })}
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
                  <TetherComponent
                    attachment="top center"
                    targetAttachment="top center"
                    targetOffset="-10px 0"
                    key={uuidv1()}
                    classPrefix="tab-wrap"
                    constraints={[{
                      to: 'target',
                      attachment: 'together'
                    }]}
                  >
                    <li
                      ref={(node) => { this.profileTabNode = node; }}
                      className={classnames('nav-item', { '-current': route === 'profile' })}
                      role="menuitem"
                      onClick={e => this.onSelectSection(e, 'profile')}
                    >
                      {
                        token ?
                          <a href="/profile" className="username">{name}</a> :
                          <a
                            className="username"
                            onClick={(e) => { this.showLogin(e); }}
                          >Log in</a>
                      }
                    </li>
                    {section === 'profile' && token &&
                      <SubMenu
                        className="-tab"
                        parent={name}
                        route={'profile'}
                        parentNode={this.profileTabNode}
                        items={profileSubmenu}
                        onCloseSubMenu={() => this.onCloseSubMenu()}
                      />}
                  </TetherComponent>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {modal === 'login' && <Login
          onClose={() => this.hideModals()}
          onSignUp={() => this.showSignUp()}
          onLogin={() => this.hideModals()}
        />}

        {modal === 'sign-up' && <SignUp
          onClose={() => this.hideModals()}
          onLogin={() => this.showLogin()}
          onSignUp={() => this.hideModals()}
        />}
      </div>
    );
  }
}

MainNav.propTypes = {
  route: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  token: PropTypes.string,
  profile: PropTypes.object
};

MainNav.defaultProps = {
  profile: {}
};

export default connect(
  state => ({
    token: state.auth.token,
    profile: state.auth.profile
  }),
  dispatch => ({
    logout() { dispatch(logout()); }
  })
)(MainNav);

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
import LogoApp from 'components/common/LogoApp';
import SubMenu from 'components/common/SubMenu';
import Modal from 'components/common/Modal';
import Login from 'components/common/Login';
import SignUp from 'components/common/SignUp';

const SOLUTION_MAP_ROUTES = ['explore-index', 'solution-detail', 'bme-detail', 'city-detail'];


class MainNav extends React.Component {

  state = {
    section: '',
    modal: {
      login: {
        open: false
      },
      signup: {
        open: false
      }
    }
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

  onSignUp() {
    this.setState({
      modal: {
        ...this.state.modal,
        login: { open: false },
        signup: { open: true }
      }
    });
  }

  hideModals(name) {
    this.setState({
      modal: {
        ...this.state.modal,
        [name]: { open: false }
      }
    });
  }

  showLogin(e) {
    e.stopPropagation();
    this.setState({
      modal: {
        ...this.state.modal,
        login: { open: true },
        signup: { open: false }
      },
      section: ''
    });
  }

  showSignUp() {
    this.setState({
      modal: {
        ...this.state.modal,
        signup: { open: true }
      },
      section: ''
    });
  }

  render() {
    const { route, token, profile } = this.props;
    const { section } = this.state;
    const { name } = profile || {};

    const toolsMenu = [
      { id: uuidv1(), label: 'Explore', route: 'explore-index' },
      { id: uuidv1(), label: 'Design', route: 'builder' }
    ];

    const profileSubmenu = [
      { id: uuidv1(), label: 'See profile' },
      { id: uuidv1(), label: 'Log out', onClick: () => { this.props.logout(); } }
    ];

    return (
      <div className="c-main-nav">
        <div className="row">
          <div className="column small-12">
            <div className="nav-container">
              <LogoApp />
              <nav className="nav">
                <ul className="nav-list" role="menubar">
                  <li
                    className={classnames('nav-item', { '-current': route === 'city-support' })}
                    role="menuitem"
                  >
                    <Link prefetch route="city-support"><a className="literal">City support</a></Link>
                  </li>
                  <li
                    className={classnames('nav-item', { '-current': route === 'events' })}
                    role="menuitem"
                  >
                    <Link prefetch route="events"><a className="literal">Events</a></Link>
                  </li>

                  <li
                    className={classnames('nav-item', { '-current': route === 'about' })}
                    role="menuitem"
                  >
                    <Link prefetch route="about"><a className="literal">About FSCI</a></Link>
                  </li>
{/*                  <li
                    className={classnames('nav-item', { '-current': SOLUTION_MAP_ROUTES.indexOf(route) !== -1 })}
                    role="menuitem"
                  >
                    <Link prefetch route="explore-index" params={{ category: 'solutions' }}>
                      <a className="literal">Solutions map</a>
                    </Link>
                  </li>*/}
{/*                  <li
                    className={classnames('nav-item', { '-current': route === 'builder' })}
                    role="menuitem"
                  >
                    <Link prefetch route="builder"><a className="literal">Design</a></Link>
                  </li>*/}

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
                      ref={(node) => { this.toolsTabNode = node; }}
                      className={classnames('nav-item -tool', { '-current': route === 'builder' })}
                      role="menuitem"
                      onMouseEnter={e => this.onSelectSection(e, 'builder')}
                      onMouseLeave={e => this.onSelectSection(e, '')}
                    >
                      <a href="/builder" className="literal">Tools</a>
                      <span className="arrow"></span>
                    </li>
                    {section === 'builder' &&
                      <SubMenu
                      className="-tab"
                      parent={'Tools'}
                      parentNode={this.toolsTabNode}
                      items={toolsMenu}
                      onCloseSubMenu={() => this.onCloseSubMenu()}
                    />}
                  </TetherComponent>


                  {/*<TetherComponent
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
                  </TetherComponent>*/}

                </ul>
              </nav>
            </div>
          </div>
        </div>

        {this.state.modal.login.open && <Modal
          open={this.state.modal.login.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            login: { open: v }
          } })}
        >
          <Login
            onClose={() => this.hideModals('login')}
            onSignUp={() => this.onSignUp()}
            onLogin={() => this.hideModals('login')}
          />
        </Modal>}

        {this.state.modal.signup.open && <Modal
          open={this.state.modal.signup.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            signup: { open: v }
          } })}
        >
          <SignUp
            onClose={() => this.hideModals('signup')}
            onLogin={(e) => { this.showLogin(e); }}
            onSignUp={() => this.hideModals('signup')}
          />
        </Modal>}
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

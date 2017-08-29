import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

// modules
import { logout } from 'modules/auth';

// components
import LogoApp from 'components/common/LogoApp';
import Modal from 'components/common/Modal';
import Login from 'components/common/Login';
import SignUp from 'components/common/SignUp';

const SOLUTION_MAP_ROUTES = ['explore-index', 'solution-detail', 'bme-detail', 'city-detail'];

class MobileHeader extends React.Component {
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

  onSignUp() {
    this.setState({
      modal: {
        ...this.state.modal,
        login: { open: false },
        signup: { open: true }
      }
    });
  }

  showLogin(e) {
    e.stopPropagation();
    this.setState({
      modal: {
        ...this.state.modal,
        login: { open: true }
      },
      section: ''
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

  showSignUp() {
    this.setState({
      modal: {
        ...this.state.modal,
        signup: { open: true }
      },
      section: ''
    });
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { route, token, profile } = this.props;
    const { modal, section, open } = this.state;
    const { name } = profile || {};

    const profileSubmenu = [
      { id: uuidv1(), label: 'See profile' },
      { id: uuidv1(), label: 'Log out', onClick: () => { this.props.logout(); } }
    ];

    const mobileHeaderClass = classnames('c-mobile-header', {
      '-open': open
    });

    return (
      <div className={mobileHeaderClass}>
        <div className="row">
          <div className="column small-12">
            <div className="nav-container">
              <LogoApp />

              {!open ?
                <button className="hamburguer" onClick={() => this.toggleMenu()}>
                  <span className="ingredient" />
                  <span className="ingredient" />
                  <span className="ingredient" />
                </button> :
                <button className="cross" onClick={() => this.toggleMenu()}>
                  <svg className="icon icon-cross"><use xlinkHref="#icon-cross" /></svg>
                </button>}

              <div className="slider">
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
                    <li
                      className={classnames('nav-item', { '-current': route === 'profile' })}
                      role="menuitem"
                      onClick={e => this.onSelectSection(e, 'profile')}
                    >
                      {
                        token ?
                          <a href="/profile" className="username">{name}</a> :
                          <a
                            href="#"
                            className="username"
                            onClick={(e) => { this.showLogin(e); }}
                          >Log in</a>
                      }
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <Modal
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
        </Modal>

        <Modal
          open={this.state.modal.signup.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            signup: { open: v }
          } })}
        >
          <SignUp
            onClose={() => this.hideModals('signup')}
            onLogin={() => this.showLogin()}
            onSignUp={() => this.hideModals('signup')}
          />
        </Modal>

      </div>
    );
  }
}

MobileHeader.propTypes = {
  route: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  token: PropTypes.string,
  profile: PropTypes.object
};

MobileHeader.defaultProps = {
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
)(MobileHeader);

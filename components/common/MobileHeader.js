import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import { connect } from 'react-redux';

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
    modal: {
      login: {
        open: false
      },
      signup: {
        open: false
      }
    }
  };

  onSignUp() {
    this.setState({
      modal: {
        ...this.state.modal,
        login: { open: false },
        signup: { open: true }
      }
    });
  }

  onLogin() {
    this.hideModals('login');
    this.toggleMenu();
  }

  onLogout(e) {
    if (e) e.preventDefault();
    this.props.logout();
    this.toggleMenu();
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }

  showSignUp() {
    this.setState({
      modal: {
        ...this.state.modal,
        signup: { open: true }
      }
    });
  }

  showLogin(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({
      modal: {
        ...this.state.modal,
        login: { open: true }
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

  render() {
    const { route, token, profile } = this.props;
    const { modal, open } = this.state;
    const { name } = profile || {};

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
                  <svg className="icon icon-close"><use xlinkHref="#icon-close" /></svg>
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
                    {!token &&
                      <li
                        className="nav-item"
                        role="menuitem"
                      >
                        <a
                          href="login"
                          className="username"
                          onClick={(e) => { this.showLogin(e); }}
                        >Log in</a>
                      </li>}
                    {token &&
                      <li
                        className={classnames('nav-item', { '-current': route === 'profile' })}
                        role="menuitem"
                      >
                        <Link prefetch route="profile"><a className="literal">{name}</a></Link>
                      </li>}
                    {token &&
                      <li
                        className="nav-item"
                        role="menuitem"
                      >
                        <a className="literal" href="logout" onClick={e => this.onLogout(e)}>Logout</a>
                      </li>}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={modal.login.open}
          toggleModal={v => this.setState({ modal: {
            ...modal,
            login: { open: v }
          } })}
        >
          <Login
            onClose={() => this.hideModals('login')}
            onSignUp={() => this.onSignUp()}
            onLogin={() => this.onLogin()}
          />
        </Modal>

        <Modal
          open={modal.signup.open}
          toggleModal={v => this.setState({ modal: {
            ...modal,
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

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import { connect } from 'react-redux';

// components
import Login from 'components/common/Login';
import SignUp from 'components/common/SignUp';

const SOLUTION_MAP_ROUTES = ['explore-index', 'solution-detail', 'bme-detail', 'city-detail'];


class MainNav extends React.Component {
  state = {
    section: '',
    modal: null,
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

  showLogin() {
    this.setState({ modal: 'login' });
  }

  showSignUp() {
    this.setState({ modal: 'sign-up' });
  }

  hideModals() {
    this.setState({ modal: null });
  }

  render() {
    const { route, token, profile } = this.props;
    const { section } = this.state;

    return (
      <div className="c-main-nav">
        <div className="row">
          <div className="column small-12">
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
                    className={classnames("nav-item", { '-current': route === 'profile' })}
                    role="menuitem"
                  >
                    {
                      token ?
                        <a href="/profile" className="username">{profile.name}</a> :
                        <a className="username" onClick={() => this.showLogin()}>Log in</a>
                    }
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {this.state.modal == 'login' && <Login
          onClose={() => this.hideModals()}
          onSignUp={() => this.showSignUp()}
          onLogin={() => this.hideModals()}
        />}

        {this.state.modal == 'sign-up' && <SignUp
          onClose={() => this.hideModals()}
          onLogin={() => this.showLogin()}
          onSignUp={() => this.hideModals()}
        />}
      </div>
    );
  }
}

MainNav.propTypes = {
  route: PropTypes.string,
};

export default connect(
  state => state.auth,
)(MainNav);

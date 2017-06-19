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
                <a>Financing Sustainable <br /> Cities Initiative</a>
              </Link>
            </div>
            <nav className="nav">
              <ul className="nav-list" role="menubar">
                <TetherComponent
                  attachment="top center"
                  targetAttachment="top center"
                  targetOffset="-15px 50%"
                  offset="0 25px"
                  constraints={[{
                    to: 'target',
                    attachment: 'together'
                  }]}
                >
                  <li
                    ref={(node) => { this.exploreListNode = node; }}
                    className={classnames('nav-item', { '-current': EXPLORE_ROUTES.indexOf(route) !== -1 })}
                    role="menuitem"
                    aria-haspopup="true"
                    tabIndex="-1"
                  >
                    <a
                      href="explore"
                      onClick={e => this.onSelectSection(e, 'explore-index')}
                      className="literal"
                    >
                    Explore
                  </a>

                  </li>
                  {section === 'explore-index' &&
                    <SubMenu
                      className="-nav"
                      parent="Explore"
                      route={'explore-index'}
                      parentNode={this.exploreListNode}
                      items={EXPLORE_TABS}
                      onCloseSubMenu={() => this.onCloseSubMenu()}
                    />}
                </TetherComponent>
                <li
                  className={classnames('nav-item', { '-current': route === 'about' })}
                  role="menuitem"
                >
                  <Link prefetch route="about"><a className="literal">About</a></Link>
                </li>
                <li className="nav-item -separator" />
                <li className="nav-item" role="menuitem">
                  <Link prefetch route="builder"><a className="literal">Build a project</a></Link>
                </li>
                <li className="nav-item" role="menuitem">
                  <a href="username" className="username">{username}</a>
                  {!logged && <svg className="icon -username"><use xlinkHref="#icon-username" /></svg>}
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

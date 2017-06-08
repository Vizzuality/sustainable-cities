import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TetherComponent from 'react-tether';
import Router from 'next/router';

// components
import SubMenu from 'components/common/SubMenu';

// constants
import { EXPLORE_SECTIONS } from 'constants/common';

export default class MainNav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: ''
    };
  }

  onSelectSection(e, active) {
    if (e) e.preventDefault();
    const currentActive = this.state.active;
    if (currentActive === active) return;

    this.setState({
      active
    });
  }

  onCloseSubMenu() {
    this.setState({
      active: ''
    });
  }

  // take a look, this is not working
  onClickItem(pathname, category) {
    Router.push(`/${pathname}/${category}`);
  }

  render() {
    const { route, logged, username } = this.props;
    const { active } = this.state;

    return (
      <div className="c-main-nav">
        <div className="row">
          <div className="nav-container">
            <div className="logo">
              <Link prefetch href="/"><a>Financing Sustainable <br /> Cities Initiative</a></Link>
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
                    className={`nav-item ${route === 'explore' ? '-current' : ''} -has-submenu`}
                    role="menuitem"
                    aria-haspopup="true"
                    tabIndex="-1"
                  >
                    <a
                      href="explore"
                      onClick={e => this.onSelectSection(e, 'explore')}
                      className="literal"
                    >
                    Explore
                  </a>

                  </li>
                  {active === 'explore' &&
                    <SubMenu
                      parent="Explore"
                      parentNode={this.exploreListNode}
                      items={EXPLORE_SECTIONS}
                      onCloseSubMenu={() => this.onCloseSubMenu()}
                      onClick={category => this.onClickItem('explore', category)}
                    />}
                </TetherComponent>
                <li className={`nav-item ${route === 'about' ? '-current' : ''}`} role="menuitem">
                  <Link prefetch href="/about"><a className="literal">About</a></Link>
                </li>
                <li className="nav-item -separator" />
                <li className="nav-item" role="menuitem">
                  <Link prefetch href="/builder"><a className="literal">Build a project</a></Link>
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

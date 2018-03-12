import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';

export default class SubMenu extends React.Component {

  handleClickInfo = () => {
    const { onCloseSubMenu, modal } = this.props
    onCloseSubMenu();
    modal.onClick();
  }

  render() {
    const { items, className, parent, route, onCloseSubMenu, modal } = this.props;
    const classNames = classnames({
      'c-submenu': true,
      [className]: !!className
    });

    return (
      <div
        className={classNames}
        onMouseLeave={onCloseSubMenu}
      >
        <div className="parent-menu">
          <span className="literal">{parent}</span>
          {!!Object.keys(modal || {}).length &&
            <button
              className="c-info-icon"
              onClick={this.handleClickInfo}
            >
              <svg className="icon -info">
                <use xlinkHref="#icon-info" />
              </svg>
            </button>}
        </div>
        <ul
          className="menu-list"
          role="menubar"
          aria-label={`Submenu for ${parent} section`}
        >
          {items.map(item => <li key={item.id} className="menu-item" role="menuitem" tabIndex="-1">
            {item.onClick ?
              <span className="literal" onClick={() => item.onClick()}>{item.label}</span>
            : <Link
              route={route || item.route}
              params={item.query}
              prefetch
            >
              <a className="literal">{item.label}</a>
            </Link>}
          </li>)}
        </ul>
      </div>
    );
  }
}


SubMenu.defaultProps = { modal: {} }

SubMenu.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  onCloseSubMenu: PropTypes.func.isRequired,
  modal: PropTypes.object,
  parent: PropTypes.string,
  route: PropTypes.string
};

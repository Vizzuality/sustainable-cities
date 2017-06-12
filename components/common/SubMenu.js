import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';

export default class SubMenu extends React.Component {

  constructor(props) {
    super(props);

    // bindings
    this._onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    this.setEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  onClickOutside(e) {
    const isClickOutside = this.subMenuNode &&
      this.subMenuNode.contains &&
      !this.subMenuNode.contains(e.target) &&
      !this.props.parentNode.contains(e.target);

    if (isClickOutside) {
      this.props.onCloseSubMenu();
    }
  }
  onClickItem(e, value) {
    if (e) e.preventDefault();
    this.props.onClick(value);
  }

  setEventListeners() {
    window.addEventListener('click', this._onClickOutside);
  }

  removeEventListeners() {
    window.removeEventListener('click', this._onClickOutside);
  }

  render() {
    const { items, className, parent, route } = this.props;
    const classNames = classnames('c-submenu', {
      [className]: !!className
    });

    return (
      <div className={classNames} ref={(node) => { this.subMenuNode = node; }}>
        <div className="parent-menu"><span className="literal">{parent}</span></div>
        <ul className="menu-list" role="menubar" aria-label={`Submenu for ${parent} section`}>
          {items.map(item => <li key={item.category} className="menu-item" role="menuitem" tabIndex="-1">
            <Link
              route={route}
              params={{ category: item.category }}
              prefetch
            >
              <a className="literal">{item.label}</a>
            </Link>
          </li>)}
        </ul>
      </div>
    );
  }
}

SubMenu.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onCloseSubMenu: PropTypes.func,
  parent: PropTypes.string,
  parentNode: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired
};

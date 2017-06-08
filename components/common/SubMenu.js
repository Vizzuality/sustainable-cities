import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';

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

  setEventListeners() {
    window.addEventListener('click', this._onClickOutside);
  }

  removeEventListeners() {
    window.removeEventListener('click', this._onClickOutside);
  }

  onClickItem(e, value) {
    if (e) e.preventDefault();

    this.props.onClick(value);
  }

  render() {
    const { items, className, parent } = this.props;
    const classNames = classnames({
      [className]: !!className
    });

    return (
      <div className={`c-submenu ${classNames}`} ref={(node) => { this.subMenuNode = node; }}>
        <div className="parent-menu"><span className="literal">{parent}</span></div>
        <ul className="menu-list" role="menubar" aria-label={`Submenu for ${parent} section`}>
          {items.map(item => <li key={item.value} className="menu-item" role="menuitem" tabIndex="-1">
            <Link href={`/explore/${item.value}`} prefetch><a className="literal">{item.label}</a></Link>
          </li>)}
        </ul>
      </div>
    );
  }
}

SubMenu.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  onCloseSubMenu: PropTypes.func,
  parent: PropTypes.string,
  parentNode: PropTypes.object,
  onClick: PropTypes.func
};

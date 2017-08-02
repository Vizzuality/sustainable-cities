import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import TetherComponent from 'react-tether';
import isEqual from 'lodash/isEqual';
import uuidv1 from 'uuid/v1';

// components
import SubMenu from 'components/common/SubMenu';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: ''
    };

    // saves node references of tabs to colocate submenus
    this.tabNodes = [];
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.queryParams, nextProps.queryParams)) {
      this.onCloseSubMenu();
    }
  }

  onClickTab(e, category) {
    if (e) e.preventDefault();
    this.setState({ category });
  }

  onCloseSubMenu() {
    this.setState({
      category: ''
    });
  }

  renderTab(item, index) {
    const { queryParams } = this.props;
    const { route, category } = queryParams;
    const { children, label, query, modal, allowAll } = item;

    if (children) {
      let subMenuOptions = children;

      if (allowAll) {
        subMenuOptions = [
          ...[{ id: -1, label: 'See all', query: { category: query.category } }],
          ...children
        ];
      }

      if (!children.length) {
        return (
          <li
            className={classnames('tab-item', { '-current': query.category === category })}
            key={uuidv1()}
            role="menuitem"
            aria-haspopup="true"
            tabIndex="-1"
          >
            <Link
              route={route}
              params={query}
              prefetch
            >
              <a
                className="literal"
              >
                {label}
              </a>
            </Link>
          </li>
        );
      }

      return (
        <TetherComponent
          attachment="top center"
          targetAttachment="top center"
          targetOffset="-15px 0"
          key={uuidv1()}
          classPrefix="tab-wrap"
          constraints={[{
            to: 'target',
            attachment: 'together'
          }]}
        >
          <li
            ref={(node) => { this.tabNodes[index] = node; }}
            className={classnames('tab-item', { '-current': query.category === category })}
            role="menuitem"
            aria-haspopup="true"
            tabIndex="-1"
          >
            <a
              href="explore"
              onClick={e => this.onClickTab(e, query.category)}
              className="literal"
            >
              {label}
            </a>
            {modal && (<div className="c-info-icon" onClick={modal.onClick}>
              <svg className="icon">
                <use xlinkHref="#icon-info" />
              </svg>
            </div>)}
          </li>
          {this.state.category === query.category &&
            <SubMenu
              className="-tab"
              parent={label}
              route={route}
              parentNode={this.tabNodes[index]}
              items={subMenuOptions}
              onCloseSubMenu={() => this.onCloseSubMenu()}
            />}
        </TetherComponent>
      );
    }

    return (
      <li
        className={classnames('tab-item', { '-current': query.category === category })}
        role="menuitem" tabIndex="-1"
        key={uuidv1()}
      >
        <Link
          route={route}
          params={query}
          prefetch
        >
          <a
            href={query.category}
            className="literal"
            onClick={e => this.onClickTab(e, query.category)}
          >
            {label}
          </a>
        </Link>
      </li>
    );
  }

  render() {
    const { items, className } = this.props;
    const classNames = classnames('c-tabs', {
      [className]: !!className
    });

    return (
      <div className={classNames}>
        <div className="row">
          <ul className="tab-list">
            {items.map((item, index) => this.renderTab(item, index))}
          </ul>
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  queryParams: PropTypes.object.isRequired
};

Tab.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import TetherComponent from 'react-tether';

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
    const { allowAll, queryParams } = this.props;
    const { route, category } = queryParams;
    const { children, label, query } = item;

    if (children) {
      let subMenuOptions = children;

      if (allowAll) {
        subMenuOptions = [
          ...[{ label: 'See all', query: { category: query.category } }],
          ...children
        ];
      }

      return (
        <TetherComponent
          attachment="top center"
          targetAttachment="top center"
          targetOffset="-15px 0"
          key={label}
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
        key={label}
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
  allowAll: PropTypes.bool, // adds to submenu options a "see all" option if needed
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  queryParams: PropTypes.object.isRequired
};

Tab.defaultProps = {
  allowAll: false
};

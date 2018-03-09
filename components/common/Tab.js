import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import TetherComponent from 'react-tether';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import uuidv1 from 'uuid/v1';

// components
import SubMenu from 'components/common/SubMenu';

// constants
import { Mobile, Tablet } from 'constants/responsive';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};


    // binding
    this.debouncedClickTab = debounce(this.onClickTab, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.queryParams, nextProps.queryParams)) {
      this.onCloseSubMenu();
    }
  }

  onClickTab(category, value) {
    this.setState({ [category]: value });
  }

  onCloseSubMenu(category) {
    this.setState({ [category]: false });
  }

  renderTab(item, index) {
    const { queryParams } = this.props;
    const { route, category } = queryParams;
    const { children, label, modal, query, allowAll } = item;

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
            className={classnames('tab-item', item.slug, label, { '-current': query.category === category })}
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
          }, {
            to: 'window',
            attachment: 'together',
            pin: true
          }]}
        >
          <li
            className={classnames('tab-item', item.slug, label, { '-current': query.category === category })}
            role="menuitem"
            aria-haspopup="true"
            tabIndex="-1"
            onMouseEnter={() => this.debouncedClickTab(query.category, true)}
            onMouseLeave={() => this.debouncedClickTab(query.category, false)}
          >
            <Mobile>
              <Link
                route="explore-index"
                params={{ category: query.category }}
              >
                <a
                  className="literal"
                >
                  {label}
                </a>
              </Link>
            </Mobile>
            <Tablet>
              <a
                href="/"
                className="literal"
              >
                {label}
              </a>
            </Tablet>
            {modal &&
              <button className="c-info-icon" onClick={modal.onClick}>
                <svg className="icon -info">
                  <use xlinkHref="#icon-info" />
                </svg>
              </button>}
          </li>
          {this.state[query.category] &&
            <Tablet>
              <SubMenu
                className="-tab"
                parent={label}
                route={route}
                items={subMenuOptions}
                onCloseSubMenu={() => this.onCloseSubMenu(query.category)}
                modal={modal}
              />
            </Tablet>}
        </TetherComponent>
      );
    }

    return (
      <li
        className={classnames('tab-item', item.slug, label, { '-current': query.category === category })}
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
            onClick={e => this.debouncedClickTab(query.category)}
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
          <div className="column small-12">
            <ul className="tab-list">
              {items.map((item, index) => this.renderTab(item, index))}
            </ul>
          </div>
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

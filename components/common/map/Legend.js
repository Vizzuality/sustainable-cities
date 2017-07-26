import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// components
import Breadcrumbs from 'components/common/Breadcrumbs';
import LegendItem from 'components/common/map/LegendItem';

class Legend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded
    };
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { layer, filters, className, categories } = this.props;
    const { category, subCategory, children } = filters;
    const { description, items } = layer.legendConfig || {};
    const currentCategory = children || subCategory || category;

    let legendDescription = '';

    if (!description && currentCategory) {
      const categoryObject = categories.find(cat => cat.slug === currentCategory) || {};
      legendDescription = categoryObject.name;
    } else {
      legendDescription = description;
    }


    const legendClass = classnames('c-legend', {
      [className]: !!className,
      '-expanded': this.state.expanded
    });

    return (
      <div className={legendClass}>
        <div className="legend-content">
          {/* how to get category names? */}
          {subCategory && <Breadcrumbs />}
          {legendDescription && <span className="legend-title">{legendDescription}</span>}
          <ul>
            {(items || []).map(item =>
              <LegendItem
                filters={filters}
                item={item}
                key={item.id}
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  categories: PropTypes.array,
  layer: PropTypes.object,
  filters: PropTypes.object,
  className: PropTypes.string,
  expanded: PropTypes.bool
};

Legend.defaultProps = {
  categories: [],
  layer: {},
  filters: {},
  expanded: true
};

export default withRedux(
  store,
  state => ({
    categories: [...state.category.solution.list, ...state.category.bme.list]
  })
)(Legend);

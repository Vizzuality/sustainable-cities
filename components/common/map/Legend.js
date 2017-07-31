import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Breadcrumbs from 'components/common/Breadcrumbs';
import LegendItem from 'components/common/map/LegendItem';

// utils
import getBreadcrumbs from 'utils/breadcrumbs';
import uniq from 'lodash/uniq';

// constants
import { CATEGORY_SOLUTIONS_COLORS, CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

const MIN_VALUE_RANGE = 1;

export default class Legend extends React.Component {
  static getLegendItems(data, filters, categories) {
    const { category, subCategory, children } = filters;
    let items = [];

    switch (true) {
      // all-solutions case
      case (!subCategory && category === 'solutions'): {
        const solutionCategories = categories.filter(cat => cat['category-type'] === 'Solution');

        let projectCategories = [];

        // gets all level-2-categories from projects
        data.forEach(d => d.projects.forEach((p) => {
          if (p['category-level-2']) projectCategories.push(p['category-level-2']);
        }));

        // removes duplicates
        projectCategories = uniq(projectCategories);

        // build the item array with the necessary values
        items = projectCategories.map((catSlug) => {
          const solutionCategory = solutionCategories.find(sc => sc.slug === catSlug);
          return ({
            id: solutionCategory.id,
            name: solutionCategory.name,
            slug: solutionCategory.slug,
            color: CATEGORY_SOLUTIONS_COLORS[solutionCategory.slug],
            type: 'single-circle'
          });
        });
        break;
      }
      // single solution case
      case (subCategory && category === 'solutions'): {
        const solutionCategory = categories.find(cat => cat.slug === subCategory);

        items = [{
          id: solutionCategory.id,
          name: solutionCategory.name,
          range: {
            min: MIN_VALUE_RANGE,
            max: data.length
          },
          color: CATEGORY_SOLUTIONS_COLORS[solutionCategory.slug],
          text: 'projects',
          type: 'range'
        }];

        break;
      }
      // level-1-BME case
      case (!subCategory && category !== 'solutions'): {
        let bmeCategory = categories.filter(cat => cat.slug === category);
        bmeCategory = bmeCategory.length ? bmeCategory[0] : {};

        items = [{
          id: bmeCategory.id,
          name: bmeCategory.name,
          label: bmeCategory.label,
          description: bmeCategory.description,
          color: CATEGORY_FIRST_LEVEL_COLORS[bmeCategory.slug],
          range: {
            min: MIN_VALUE_RANGE,
            max: data.length
          },
          text: 'elements used',
          type: 'range'
        }];

        break;
      }
      // levels-2-3-BME case
      case ((children || subCategory) && category !== 'solutions'): {
        let bmeCategory = {};
        let parentCategory = {};

        parentCategory = categories.filter(cat => (cat.children || [])
          .find(child => child.slug === subCategory) || false);
        bmeCategory = parentCategory.length ? (parentCategory[0].children || [])
          .find(child => child.slug === subCategory) : {};

        if (children) {
          bmeCategory = (bmeCategory.children || []).find(child => child.slug === children);
        }

        items = [{
          id: bmeCategory.id,
          name: bmeCategory.name,
          range: {
            min: MIN_VALUE_RANGE,
            max: data.length
          },
          color: CATEGORY_FIRST_LEVEL_COLORS[parentCategory[0].slug],
          text: 'elements used',
          type: 'range'
        }];

        break;
      }

      default:
        items = [];
    }

    return items;
  }
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
    const { activeLayer, filters, className, categories, layerData } = this.props;
    const { subCategory } = filters;
    const { name } = activeLayer.legendConfig || {};
    const { expanded } = this.state;
    const items = Legend.getLegendItems(layerData.data, filters, categories);

    const legendClass = classnames('c-legend', {
      [className]: !!className,
      '-expanded': expanded
    });

    return (
      <div className={legendClass}>
        <div className="toggle-container ">
          <div role="presentation" className="toggle" onClick={() => this.toggleExpand()} />
        </div>
        <div className="legend-content">
          {subCategory &&
            <Breadcrumbs items={getBreadcrumbs(categories, filters)} />}
          {name
            && <span className="legend-title">{name}</span>}
          <ul>
            {(items || []).map(item =>
              <LegendItem
                key={item.id}
                item={item}
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
  filters: PropTypes.object,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  layerData: PropTypes.object,
  activeLayer: PropTypes.object
};

Legend.defaultProps = {
  categories: [],
  filters: {},
  expanded: true,
  layerData: {},
  activeLayer: {}
};

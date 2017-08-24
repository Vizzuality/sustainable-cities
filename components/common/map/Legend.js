import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uuidv1 from 'uuid/v1';

// components
import Breadcrumbs from 'components/common/Breadcrumbs';
import LegendItem from 'components/common/map/LegendItem';

// utils
import getBreadcrumbs from 'utils/breadcrumbs';
import uniq from 'lodash/uniq';
import { groupProjectsByCity } from 'utils/project';

// constants
import {
  CATEGORY_SOLUTIONS_COLORS,
  CATEGORY_FIRST_LEVEL_COLORS,
  CATEGORY_ICONS
} from 'constants/category';

const MIN_VALUE_RANGE = 1;
const MULTI_SOLUTION_ITEM = {
  id: uuidv1(),
  name: 'Multiple Solutions',
  color: CATEGORY_SOLUTIONS_COLORS['multi-solution'],
  type: 'single-circle'
};

export default class Legend extends React.Component {
  static getMaxValue(data, filters) {
    const { category, subCategory, children } = filters;
    const projectsByCity = groupProjectsByCity(data);
    let maxValue = 0;
    const maxValuePerProject = [];

    projectsByCity.forEach((city) => {
      if (category === 'solutions') {
        maxValue = city.projects.length > maxValue ? city.projects.length : maxValue;
      }

      if (category !== 'solutions') {
        (city.projects || []).forEach((project) => {
          const { bmesQuantity } = project.cities ? project.cities[0] : {};
          let currentBme = {};

          if (category) {
            currentBme = (bmesQuantity || []).find(bme => bme.slug === category) || {};
          }

          if (subCategory) {
            currentBme = (currentBme.children || []).find(bme => bme.slug === subCategory) || {};
          }

          if (children) {
            currentBme = (currentBme.children || []).find(bme => bme.slug === children) || {};
          }

          maxValuePerProject.push(currentBme.quantity);
        });

        const sortedValues = uniq(maxValuePerProject).sort((a, b) => {
          if (parseInt(a, 10) > parseInt(b, 10)) return 1;
          if (parseInt(a, 10) < parseInt(b, 10)) return -1;
          return 0;
        });

        maxValue = sortedValues[sortedValues.length - 1];
      }
    });

    return maxValue;
  }

  static getLegendItems(data, filters, categories) {
    const { category, subCategory, children } = filters;
    let items = [];

    switch (true) {
      // all-solutions case
      case (!subCategory && category === 'solutions'): {
        const solutionCategories = categories.filter(cat => cat['category-type'] === 'Solution');

        let projectCategories = [];

        // gets all level-2-categories from projects
        data.forEach((project) => {
          if (project.categoryLevel2) projectCategories.push(project.categoryLevel2);
        });

        // removes duplicates
        projectCategories = uniq(projectCategories).sort((a, b) => {
          if (a.toLowerCase() > b.toLowerCase()) return 1;
          if (b.toLowerCase() > a.toLowerCase()) return -1;
          return 0;
        });

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

        items.push(MULTI_SOLUTION_ITEM);

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
            max: Legend.getMaxValue(data, filters)
          },
          color: CATEGORY_SOLUTIONS_COLORS[solutionCategory.slug],
          text: 'projects',
          icon: CATEGORY_ICONS[solutionCategory.slug],
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
            max: Legend.getMaxValue(data, filters)
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

        if (bmeCategory) {
          items = [{
            id: bmeCategory ? bmeCategory.id : uuidv1(),
            name: bmeCategory.name,
            range: {
              min: MIN_VALUE_RANGE,
              max: Legend.getMaxValue(data, filters)
            },
            color: CATEGORY_FIRST_LEVEL_COLORS[parentCategory[0].slug],
            text: 'elements used',
            type: 'range'
          }];
        }


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

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Router } from 'routes';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getCategoryTree, getCategories, setCategoryFilters } from 'modules/category';
import { getProjects, setProjectFilters } from 'modules/project';

// selectors
import { getCategoryTabs } from 'selectors/category';
import { getProjectGallery } from 'selectors/project';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';
import ItemGallery from 'components/explore/ItemGallery';

// constants
import { SAMPLE_GRID_CATEGORIES_DATA } from 'constants/explore';
import { CATEGORY_TYPE_CONVERSION } from 'constants/category';


class ExploreIndex extends Page {

  componentWillMount() {
    this.props.getCategoryTree();
  }

  componentDidMount() {
    this.setFilters(this.props);

    // sets Solutions as default section
    Router.pushRoute('explore-index', { category: 'solutions' });
  }

  componentWillReceiveProps(nextProps) {
    // updates filters
    if (!isEqual(this.props.queryParams, nextProps.queryParams)) {
      this.setFilters(nextProps);
    }

    // retrieves projects and categories if filters have been updated
    if (!isEqual(this.props.categoryFilters, nextProps.categoryFilters)) {
      this.props.getCategories(nextProps.categoryFilters);
    }

    if (!isEqual(this.props.projectFilters, nextProps.projectFilters)) {
      this.props.getProjects(nextProps.projectFilters);
    }
  }

  setFilters({ queryParams }) {
    const { category, subCategory } = queryParams;
    const NonBmeType = category === 'solutions' ? CATEGORY_TYPE_CONVERSION.solution : null;
    const NonCityCategory = category === 'solutions' && !subCategory ?
      null : subCategory || category;

    this.props.setCategoryFilters({
      type: category && category !== 'solutions' && category !== 'cities' ?
        CATEGORY_TYPE_CONVERSION.bme : NonBmeType,
      category: category && category !== 'cities' ? NonCityCategory : null
    });

    this.props.setProjectFilters({
      bme: category && category !== 'solutions' && category !== 'cities' ?
        subCategory || category : null,
      solution: category === 'solutions' && subCategory ? subCategory : null,
      city: category === 'cities' ? subCategory || null : null
    });
  }

  render() {
    const { categoryTabs, loadingProjects, queryParams } = this.props;
    const { category, subCategory } = queryParams;

    // This is a temporary variable to show some content
    // eslint-disable-next-line
    const description = `Solution description lorem ipusm casius tesebe erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
      porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi
      erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.`;

    return (
      <Layout
        title="Explore"
        queryParams={queryParams}
      >
        <Cover title="Explore" description={description} />
        <h1>Explore Index</h1>
        <strong>Category?: </strong> {category || '–'}<br />
        <strong>Sub-category?: </strong> {subCategory || '–'}
        <Tab
          allowAll
          className="-explore"
          items={categoryTabs}
          queryParams={queryParams}
        />
        <div className="row">
          <div className="column small-12">
            {loadingProjects ?
              <div>Loading projects...</div> :
              <ItemGallery items={SAMPLE_GRID_CATEGORIES_DATA} />}
          </div>
        </div>
      </Layout>
    );
  }
}

ExploreIndex.propTypes = {
  // categories
  categoryFilters: PropTypes.object,
  filteredCategories: PropTypes.array,
  categoryTabs: PropTypes.array,
  // projects
  loadingProjects: PropTypes.bool,
  projectFilters: PropTypes.object,
  projects: PropTypes.array,
  // queryParams
  queryParams: PropTypes.object.isRequired
};

ExploreIndex.defaultProps = {
  categoryTabs: [],
  projects: []
};

export default withRedux(
  store,
  state => ({
    // categories
    categories: state.category.list,
    categoryFilters: state.category.filters,
    categoryTabs: getCategoryTabs(state),
    filteredCategories: state.category.filteredCategories,
    // projects
    loadingProjects: state.project.loading,
    projects: state.project.list,
    projectsGallery: getProjectGallery(state),
    projectFilters: state.project.filters
  }),
  dispatch => ({
    // categories
    getCategoryTree() { dispatch(getCategoryTree()); },
    getCategories(filters) { dispatch(getCategories(filters)); },
    setCategoryFilters(filters) { dispatch(setCategoryFilters(filters)); },
    // projects
    getProjects(filters) { dispatch(getProjects(filters)); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); }
  })
)(ExploreIndex);

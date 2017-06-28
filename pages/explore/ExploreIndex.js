import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Router } from 'routes';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getCategoryTree, getCategories, setCategoryFilters } from 'modules/category';
import { getProjects, setProjectFilters, setParsedProjects, setSolutionId, removeProjectDetail } from 'modules/project';

// selectors
import { getCategoryTabs } from 'selectors/category';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';
import ItemGallery from 'components/explore/ItemGallery';

// utils
import { isArrayEqual } from 'utils/common';
import { getCategoryIdBySlug } from 'utils/category';

// constants
import { CATEGORY_TYPE_CONVERSION } from 'constants/category';
import { EXPLORE_DESCRIPTION } from 'constants/explore';


class ExploreIndex extends Page {
  static _getSubCategoryId({ queryParams, categoryTabs }) {
    const { subCategory } = queryParams || {};
    let id = null;
    if (categoryTabs && subCategory) {
      id = getCategoryIdBySlug(categoryTabs, subCategory);
    }

    return id;
  }

  componentWillMount() {
    // this._setProjectFilters(this.props);

    this.props.getCategoryTree();
  }

  componentDidMount() {
    const { queryParams, projectFilters } = this.props;
    const { category, subCategory, route } = queryParams;

    if (!category && !subCategory && route === 'explore-index') {
      // sets Solutions as default section
      Router.replaceRoute('explore-index', { category: 'solutions' });
    }

    // when user is at '/explore/solutions', there's no filter change, so we force
    // getting projects
    if ((!category && !subCategory) || (category === 'solutions' && !subCategory)) {
      this.props.getProjects(projectFilters);
    }
  }

  componentWillReceiveProps(nextProps) {
    // updates category and project filters
    if (!isEqual(this.props.queryParams, nextProps.queryParams)) {
      this._setCategoryFilters(nextProps);
      this._setProjectFilters(nextProps);
    }

    // retrieves categories if filters have been updated
    if (!isEqual(this.props.categoryFilters, nextProps.categoryFilters)) {
      this.props.getCategories(nextProps.categoryFilters);
    }

    // retrieves projects if filters have been updated
    if (!isEqual(this.props.projectFilters, nextProps.projectFilters)) {
      this.props.getProjects(nextProps.projectFilters);
    }

    // parses projects based on filters if those ones have changed
    if (!isArrayEqual(this.props.projects, nextProps.projects)) {
      this.props.setParsedProjects(nextProps.projects, nextProps.projectFilters);
    }

    // if the category tree is ready, gets the solution id through its slug
    if (!isArrayEqual(this.props.categoryTabs, nextProps.categoryTabs)) {
      const solutionId = ExploreIndex._getSubCategoryId(nextProps);
      if (solutionId) this.props.setSolutionId(solutionId);
    }
  }

  componentDidUpdate(prevProps) {
    const { subCategory } = this.props.queryParams;
    const { subCategory: prevSubCategory } = prevProps.queryParams;

    if (!!subCategory && prevSubCategory !== subCategory) {
      const solutionId = ExploreIndex._getSubCategoryId(this.props);
      if (solutionId) this.props.setSolutionId(solutionId);
    }
  }

  _setProjectFilters({ queryParams }) {
    const { category, subCategory } = queryParams;

    this.props.setProjectFilters({
      bme: category && category !== 'solutions' && category !== 'cities' ?
        subCategory || category : null,
      solution: category === 'solutions' && !subCategory ? 'all' : subCategory,
      city: category === 'cities' ? subCategory || null : null
    });
  }

  _setCategoryFilters({ queryParams }) {
    const { category, subCategory } = queryParams;
    const NonBmeType = category === 'solutions' ?
      CATEGORY_TYPE_CONVERSION.solution : null;
    const NonCityCategory = category === 'solutions' && !subCategory ?
      null : subCategory || category;

    this.props.setCategoryFilters({
      type: category && category !== 'solutions' && category !== 'cities' ?
        CATEGORY_TYPE_CONVERSION.bme : NonBmeType,
      category: category && category !== 'cities' ? NonCityCategory : null
    });
  }

  render() {
    const {
      categoryTabs,
      loadingProjects,
      parsedProjects,
      queryParams,
      projectFilters
    } = this.props;
    const { category, subCategory } = queryParams;
    const { solution } = projectFilters;

    return (
      <Layout
        title="Explore"
        queryParams={queryParams}
      >
        <Cover title="Explore" description={EXPLORE_DESCRIPTION} />
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
              parsedProjects.length > 0 &&
                <ItemGallery
                  items={parsedProjects}
                  slider={solution === 'all'}
                />}
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
  parsedProjects: PropTypes.array,
  // queryParams
  queryParams: PropTypes.object.isRequired
};

ExploreIndex.defaultProps = {
  categoryTabs: [],
  projects: [],
  parsedProjects: []
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
    parsedProjects: state.project.parsedList,
    projectFilters: state.project.filters
  }),
  dispatch => ({
    // categories
    getCategoryTree() { dispatch(getCategoryTree()); },
    getCategories(filters) { dispatch(getCategories(filters)); },
    setCategoryFilters(filters) { dispatch(setCategoryFilters(filters)); },
    // projects
    getProjects(filters) { dispatch(getProjects(filters)); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    setSolutionId(solutionId) { dispatch(setSolutionId(solutionId)); },
    setParsedProjects(projects, filters) { dispatch(setParsedProjects(projects, filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); }
  })
)(ExploreIndex);

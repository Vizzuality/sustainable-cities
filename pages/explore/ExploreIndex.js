import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Router } from 'routes';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getCategoryTree, getCategories, setCategoryFilters } from 'modules/category';
import {
  getProjects,
  setProjectFilters,
  setParsedProjects,
  removeProjectDetail,
  resetProjectFilters
} from 'modules/project';
import { getBmes, setBmeFilters, setBmeCategoryId } from 'modules/bme';

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

// constants
import { CATEGORY_TYPE_CONVERSION } from 'constants/category';
import { EXPLORE_DESCRIPTION } from 'constants/explore';


class ExploreIndex extends Page {
  componentWillMount() {
    // retrieves solutions and BME categories to populate tabs
    this.props.getCategoryTree();
  }

  componentDidMount() {
    const { queryParams } = this.props;
    const { category, subCategory, id } = queryParams;

    this._setProjectFilters(this.props);
    this._setBmeFilters(this.props);

    if ((!category && !subCategory) || !!id) {
      // sets Solutions as default section
      Router.replaceRoute('explore-index', { category: 'solutions' });
    }
  }

  componentWillReceiveProps(nextProps) {
    // updates category and project filters
    if (!isEqual(this.props.queryParams, nextProps.queryParams)) {
      this._setCategoryFilters(nextProps);
      this._setProjectFilters(nextProps);
      this._setBmeFilters(nextProps);
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
    if (!isArrayEqual(this.props.projects, nextProps.projects) && nextProps.queryParams.category === 'solutions') {
      this.props.setParsedProjects(nextProps.projects, nextProps.projectFilters);
    }

    // retrieves bmes if filters have been updated
    if (!isEqual(this.props.bmeFilters, nextProps.bmeFilters) && nextProps.queryParams.category !== 'solutions') {
      this.props.getBmes(nextProps.bmeFilters);
    }
  }

  componentWillUnmount() {
    this.props.resetProjectFilters();
  }

  _setProjectFilters({ queryParams }) {
    const { category, subCategory } = queryParams;

    this.props.setProjectFilters({
      bme: category && category !== 'solutions' && category !== 'cities' ?
        subCategory || category : null,
      solution: category === 'solutions' ? subCategory || 'all' : null,
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

  _setBmeFilters({ queryParams }) {
    const { category, subCategory } = queryParams;

    this.props.setBmeFilters({
      category: category !== 'solutions' ? subCategory || category : null
    });
  }

  render() {
    const {
      categoryTabs,
      loadingProjects,
      parsedProjects,
      queryParams,
      projectFilters,
      bmes,
      loadingBmes
    } = this.props;
    const { category } = queryParams;
    const { solution } = projectFilters;
    const loader = !solution ? loadingProjects : loadingBmes;
    const items = category === 'solutions' ? parsedProjects : bmes;

    return (
      <Layout
        title="Explore"
        queryParams={queryParams}
      >
        <Cover title="Explore" description={EXPLORE_DESCRIPTION} />
        <Tab
          allowAll
          className="-explore"
          items={categoryTabs}
          queryParams={queryParams}
        />
        <div className="row">
          <div className="column small-12">
            {loader ?
              <div>Loading projects...</div> :
              items.length > 0 &&
                <ItemGallery
                  items={items}
                  slider={solution === 'all' || category !== 'solutions'}
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
  parsedProjects: [],
  bmes: []
};

export default withRedux(
  store,
  state => ({
    // categories
    categories: state.category.list,
    categoryFilters: state.category.filters,
    categoryTabs: getCategoryTabs(state),
    // projects
    loadingProjects: state.project.loading,
    projects: state.project.list,
    parsedProjects: state.project.parsedList,
    projectFilters: state.project.filters,
    // bmes
    loadingBmes: state.bme.loading,
    bmes: state.bme.list,
    bmeFilters: state.bme.filters
  }),
  dispatch => ({
    // categories
    getCategoryTree() { dispatch(getCategoryTree()); },
    getCategories(filters) { dispatch(getCategories(filters)); },
    setCategoryFilters(filters) { dispatch(setCategoryFilters(filters)); },
    // projects
    getProjects(filters) { dispatch(getProjects(filters)); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    resetProjectFilters() { dispatch(resetProjectFilters()); },
    setParsedProjects(projects, filters) { dispatch(setParsedProjects(projects, filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); },
    // bmes
    getBmes(filters) { dispatch(getBmes(filters)); },
    setBmeFilters(filters) { dispatch(setBmeFilters(filters)); },
    setBmeCategoryId(categoryId) { dispatch(setBmeCategoryId(categoryId)); }
  })
)(ExploreIndex);

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Router } from 'routes';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import {
  getSolutionCategories,
  getBmeCategories,
  setCategoryFilters
} from 'modules/category';
import {
  getProjectsByCategory,
  setProjectFilters,
  removeProjectDetail,
  resetProjectFilters
} from 'modules/project';
import { getBmes, setBmeFilters } from 'modules/bme';

// selectors
import { getCategoryTabs } from 'selectors/category';
import { getParsedProjects } from 'selectors/project';
import { getParsedBmes } from 'selectors/bme';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';
import Map from 'components/common/map/Map';
import ItemGallery from 'components/explore/ItemGallery';

// utils
import LayerManager from 'utils/map/LayerManager';
import LayerSpec from 'utils/map/layerSpec.json';
import getLayerType from 'utils/map/layer';

// constants
import { EXPLORE_DESCRIPTION } from 'constants/explore';

class ExploreIndex extends Page {
  componentWillMount() {
    // retrieves solutions and BME categories to populate tabs
    this.props.getSolutionCategories();
    this.props.getBmeCategories();
  }

  componentDidMount() {
    const { queryParams } = this.props;
    const { category, subCategory, id } = queryParams;

    if ((!category && !subCategory) || !!id) {
      // sets Solutions as default section
      Router.replaceRoute('explore-index', { category: 'solutions' });
    } else {
      this._setProjectFilters(this.props);
      this._setBmeFilters(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    // updates filters
    if (!isEqual(this.props.queryParams, nextProps.queryParams)) {
      this._setProjectFilters(nextProps);
      this._setBmeFilters(nextProps);
    }

    // retrieves projects if filters have been updated
    if (!isEqual(this.props.projectFilters, nextProps.projectFilters)) {
      this.props.getProjectsByCategory(nextProps.projectFilters);
    }

    // retrieves bmes if filters have been updated
    if (!isEqual(this.props.bmeFilters, nextProps.bmeFilters) && nextProps.queryParams.category !== 'solutions') {
      this.props.getBmes(nextProps.bmeFilters);
    }
  }

  componentWillUnmount() {
    this.props.resetProjectFilters();
  }

  _updateView({ queryParams }) {
    const { category } = queryParams;

    this.setState({
      view: category && category !== 'solutions' ? 'Bme' : 'Solution'
    });
  }

  _setProjectFilters({ queryParams }) {
    const { category, subCategory } = queryParams;

    this.props.setProjectFilters({
      categoryType: category && category === 'solutions' ?
        'Solution' : 'Bme',
      category: subCategory,
      city: category === 'cities' ? subCategory || null : null
    });
  }

  _setBmeFilters({ queryParams }) {
    const { category, subCategory, children } = queryParams;

    this.props.setBmeFilters({
      category: category !== 'solutions' ? category : null,
      subCategory: category !== 'solutions' ? subCategory : null,
      children: category !== 'solutions' ? children : null
    });
  }


  render() {
    const {
      categoryTabs,
      loadingProjects,
      loadingBmes,
      parsedProjects,
      parsedBmes,
      queryParams
    } = this.props;
    const { category, subCategory, children } = queryParams;
    const isLoading = loadingProjects || loadingBmes;
    const isSolutionView = category === 'solutions';
    const items = isSolutionView ? parsedProjects : parsedBmes;
    const activeLayers = LayerSpec.find(ls => ls.type === getLayerType(queryParams));

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
        <div className="l-map-container">
          <Map
            layersActive={[activeLayers]}
            LayerManager={LayerManager}
          />
        </div>
        <div className="row">
          <div className="column small-12">
            {isLoading ?
              <div>Loading data...</div> :
              <ItemGallery
                items={items}
                isSolutionView={isSolutionView}
                slider={(isSolutionView && !subCategory) || (!isSolutionView && !children)}
                showAll={(isSolutionView && !subCategory) || (!isSolutionView && !children)}
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
  // bmes
  loadingBmes: PropTypes.bool,
  bmes: PropTypes.array,
  parsedBmes: PropTypes.array,
  // queryParams
  queryParams: PropTypes.object.isRequired
};

ExploreIndex.defaultProps = {
  // categories
  categoryTabs: [],
  // projects
  projects: [],
  parsedProjects: [],
  // bmes
  bmes: [],
  parsedBmes: []
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
    parsedProjects: getParsedProjects(state),
    projectFilters: state.project.filters,
    // bmes
    loadingBmes: state.bme.loading,
    bmes: state.bme.list,
    parsedBmes: getParsedBmes(state),
    bmeFilters: state.bme.filters
  }),
  dispatch => ({
    // categories
    getSolutionCategories() { dispatch(getSolutionCategories()); },
    getBmeCategories() { dispatch(getBmeCategories()); },
    setCategoryFilters(filters) { dispatch(setCategoryFilters(filters)); },
    // projects
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    getProjectsByCategory(filters) { dispatch(getProjectsByCategory(filters)); },
    resetProjectFilters() { dispatch(resetProjectFilters()); },
    removeProjectDetail() { dispatch(removeProjectDetail()); },
    // bmes
    getBmes(filters) { dispatch(getBmes(filters)); },
    setBmeFilters(filters) { dispatch(setBmeFilters(filters)); }
  })
)(ExploreIndex);

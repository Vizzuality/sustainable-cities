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
import { getLayer, removeDataLayer } from 'modules/map';
import { getCities } from 'modules/city';

// selectors
import { getCategoryTabs, getAllCategories } from 'selectors/category';
import { getParsedProjects } from 'selectors/project';
import { getParsedBmes } from 'selectors/bme';
import { getParsedCities } from 'selectors/city';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Tab from 'components/common/Tab';
import Map from 'components/common/map/Map';
import Legend from 'components/common/map/Legend';
import ItemGallery from 'components/explore/ItemGallery';

// utils
import LayerManager from 'utils/map/LayerManager';
import LayerSpec from 'utils/map/layerSpec.json';
import getLayerType from 'utils/map/layer';

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
      if (category === 'cities') {
        this.props.getCities();
      }

      this._setProjectFilters(this.props);
      this._setBmeFilters(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const queryParamsChanged = !isEqual(this.props.queryParams, nextProps.queryParams);
    // updates filters
    if (queryParamsChanged) {
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

    if (queryParamsChanged && nextProps.queryParams.category === 'cities') {
      this.props.getCities();
    }
  }

  componentWillUnmount() {
    this.props.resetProjectFilters();
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

  _setItemsToDisplay() {
    const { queryParams, parsedBmes, parsedCities, parsedProjects } = this.props;
    const { category } = queryParams;
    let items = [];

    switch (category) {
      case 'cities':
        items = parsedCities;
        break;

      case 'solutions':
        items = parsedProjects;
        break;
      default:
        items = parsedBmes;
    }

    return items;
  }


  render() {
    const {
      categories,
      categoryTabs,
      loadingProjects,
      loadingBmes,
      loadingCities,
      queryParams
    } = this.props;
    const { category, subCategory, children } = queryParams;
    const isLoading = loadingProjects || loadingBmes || loadingCities;
    const isSolutionView = category === 'solutions';
    const isBmeView = (category !== 'solutions') && (category !== 'cities');
    const isCityView = category === 'cities';
    const items = this._setItemsToDisplay();
    const activeLayer = LayerSpec.find(ls => ls.type === getLayerType(queryParams));

    return (
      <Layout
        title="Explore"
        queryParams={queryParams}
      >
        <Tab
          allowAll
          className="-explore"
          items={categoryTabs}
          queryParams={queryParams}
        />
        {!isCityView &&
          <div className="l-map-container">
            <Map
              activeLayer={[activeLayer]}
              LayerManager={LayerManager}
              categories={categories}
              filters={queryParams}
              getLayer={this.props.getLayer}
              layerData={this.props.layer}
              removeDataLayer={this.props.removeDataLayer}
              loading={this.props.loadingMap}
            />
            {categories.length > 0 &&
              <Legend
                categories={categories}
                filters={queryParams}
                activeLayer={activeLayer}
                layerData={this.props.layer}
              />}
          </div>}
        <div className="row">
          <div className="column small-12">
            {isLoading ?
              <div>Loading data...</div> :
              <ItemGallery
                items={items}
                isSolutionView={isSolutionView}
                slider={(isSolutionView && !subCategory) ||
                  (isBmeView && !children) || (!isCityView)}
                showAll={(isSolutionView && !subCategory) ||
                  (isBmeView && !children)}
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
  queryParams: PropTypes.object.isRequired,
  // map
  loadingMap: PropTypes.bool,
  layer: PropTypes.object,
  // cities
  loadingCities: PropTypes.bool
};

ExploreIndex.defaultProps = {
  // categories
  categoryTabs: [],
  // projects
  projects: [],
  parsedProjects: [],
  // bmes
  bmes: [],
  parsedBmes: [],
  // map
  layer: {}
};

export default withRedux(
  store,
  state => ({
    // categories
    categories: getAllCategories(state),
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
    bmeFilters: state.bme.filters,
    // map
    loadingMap: state.map.loading,
    layer: state.map.layer,
    // cities
    loadingCities: state.city.loading,
    parsedCities: getParsedCities(state)
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
    setBmeFilters(filters) { dispatch(setBmeFilters(filters)); },
    // map
    getLayer(layerSpec) { dispatch(getLayer(layerSpec)); },
    removeDataLayer() { dispatch(removeDataLayer()); },
    // cities
    getCities() { dispatch(getCities()); }
  })
)(ExploreIndex);

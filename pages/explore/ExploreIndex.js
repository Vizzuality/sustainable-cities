import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Router } from 'routes';
import Tether from 'react-tether';

// Redux
import withRedux from 'next-redux-wrapper';
import withTracker from 'hoc/withTracker';
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

import {
  getBmes,
  setBmeFilters,
  resetBmeFilters
} from 'modules/bme';
import { getLayer, removeDataLayer } from 'modules/map';
import { getCities } from 'modules/city';

// selectors
import { getCategoryTabs, getAllCategories } from 'selectors/category';
import { getParsedProjects } from 'selectors/project';
import { getParsedBmes } from 'selectors/bme';
import { getParsedCities } from 'selectors/city';
import { bmesAsDownload, citiesAsDownload, solutionsAsDownload } from 'selectors/download';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Tab from 'components/common/Tab';
import Map from 'components/common/map/Map';
import Legend from 'components/common/map/Legend';
import ItemGallery from 'components/explore/ItemGallery';
import DownloadData from 'components/common/DownloadData';
import Modal from 'components/common/Modal';
import DisclaimerModal from 'components/common/disclaimer/DisclaimerModal';
import DownloadDataModal from 'components/common/modal/DownloadDataModal';
import Spinner from 'components/common/Spinner';
import Breadcrumbs from 'components/common/Breadcrumbs';

// utils
import LayerManager from 'utils/map/LayerManager';
import LayerSpec from 'utils/map/layerSpec.json';
import getLayerType from 'utils/map/layer';
import getBreadcrumbs from 'utils/breadcrumbs';

// constants
import { GA_EXPLORE } from 'constants/analytics';

class ExploreIndex extends Page {

  state = {
    modal: {
      disclaimer: {
        open: false,
        category: null
      },
      download: false
    }
  };

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
      this.props.getCities();

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
    this.props.resetBmeFilters();
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

  _openDownloadData() {
    this.setState({
      modal: {
        ...this.state.modal,
        download: true
      }
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

  _setDisplayConditions() {
    const { category, subCategory, children } = this.props.queryParams;
    const isSolutionView = category === 'solutions';
    const isBmeView = (category !== 'solutions') && (category !== 'cities');
    const isCityView = category === 'cities';
    let conditions = null;

    switch (true) {
      case (isSolutionView): {
        conditions = (isSolutionView && !subCategory);
        break;
      }
      case (isBmeView): {
        conditions = (isBmeView && !children);
        break;
      }
      case (isCityView): {
        conditions = !isCityView;
        break;
      }
      default:
        return conditions;
    }

    return conditions;
  }

  render() {
    const {
      bmesDownloadOptions,
      categories,
      categoryTabs,
      cityDownloadOptions,
      loadingProjects,
      loadingBmes,
      loadingCities,
      queryParams,
      solutionsDownloadOptions
    } = this.props;
    const { category, subCategory } = queryParams;
    const isSolutionView = category === 'solutions';
    const items = this._setItemsToDisplay();
    const conditions = this._setDisplayConditions();
    const isCityView = category === 'cities';
    const isLoading = loadingProjects || loadingBmes || (isCityView ? loadingCities : false);
    const activeLayer = LayerSpec.find(ls => ls.type === getLayerType(queryParams));
    // temporary client's request. Remove ASAP.
    const forbiddenBme = category === 'investment-components';

    const modifiedCategoryTabs = categoryTabs.map(tab => ({
      ...tab,
      modal: tab.hasModal ? {
        onClick: () => this.setState({
          modal: {
            ...this.state.modal,
            disclaimer: {
              open: true,
              category: tab.slug
            }
          }
        })
      } : null
    }));


    const breadcrumbsContent = (categories || []).length > 0 ? getBreadcrumbs(categories, queryParams, true) : [];
    const breadcrumbs = breadcrumbsContent.length > 0 ? <Breadcrumbs items={breadcrumbsContent} /> : null;

    return (
      <Layout
        title="Explore"
        queryParams={queryParams}
      >
        <Tether
          attachment="middle center"
          targetAttachment="middle center"
          classPrefix="fixed-navigation"
          constraints={[{
            to: 'window',
            pin: true
          }]}
        >
          <Tab
            allowAll
            className="-explore"
            items={modifiedCategoryTabs}
            queryParams={queryParams}
          />

          <Tab
            allowAll
            className="-explore"
            items={modifiedCategoryTabs}
            queryParams={queryParams}
          />

        </Tether>
        {/* MAP */}
        {!forbiddenBme && <div className="l-map-container">
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
          {(!isCityView && categories.length > 0) &&
            <div className="row">
              <div className="column small-12">
                <Legend
                  categories={categories}
                  filters={queryParams}
                  activeLayer={activeLayer}
                  layerData={this.props.layer}
                />
              </div>
            </div>}
        </div>}
        <div className="l-content">
          <div className="row">
            <div className="column small-12">
              {isLoading ?
                <Spinner isLoading /> :
                <ItemGallery
                  items={items}
                  isSolutionView={isSolutionView}
                  slider={conditions}
                  showAll={conditions}
                  breadcrumbs={breadcrumbs}
                />}
            </div>
          </div>
          {/* hardcoded logo display buses logos */}
          {subCategory === 'low-and-zero-emission-buses' &&
            <div className="c-buses-acknowledges">
              <div className="row">
                <div className="column small-12">
                  <p className="c-text -fs-medium -fw-light">
                    This research was financially supported by the Climate Technology Transfer Mechanisms
                    and Networks in Latin America and the Caribbean project implemented by the
                    Inter-American Development Bank and the World Resources Institute with funds from
                    the Global Environmental Facility.
                  </p>
                </div>
              </div>
              <div className="logos-container">
                <div className="row row-container">
                  <div className="column small-12 medium-3">
                    <div className="logo-background" style={{ backgroundImage: 'url(/static/images/GEF_logo_Global_Environment_Facility.png)' }} />
                  </div>
                  <div className="column small-12 medium-3">
                    <div className="logo-background" style={{ backgroundImage: 'url(/static/images/Inter-American-Development-Bank.png)' }} />
                  </div>
                </div>
              </div>
            </div>
          }
          {subCategory === 'biodegradable-energy-to-waste' &&
            <div className="additional-info">
              <div className="row">
                <div className="column small-12">
                  <p className="c-text -fs-medium -fw-light">
                    Research conducted by Megha Shenoy with assistance
                    from Xiaotian Fu and Poornima Wasdani. Special thanks
                    to all of the staff from private companies and research
                    institutions who willingly shared their knowledge and time
                    to help us complete this research.
                  </p>
                </div>
              </div>
            </div>
          }
        </div>

        {/*<DownloadData
          onClickButton={() => this._openDownloadData()}
        />*/}

        {this.state.modal.download && <Modal
          open={this.state.modal.download}
          toggleModal={v => this.setState({
            modal: { ...this.state.modal, download: v }
          })}
          loading={loadingBmes || loadingCities}
        >
          <DownloadDataModal
            bmes={bmesDownloadOptions}
            cities={cityDownloadOptions}
            solutions={solutionsDownloadOptions}
            onClose={() => this.setState({
              modal: { ...this.state.modal, download: false }
            })}
          />
        </Modal>}

        {this.state.modal.disclaimer.open && <Modal
          open={this.state.modal.disclaimer.open}
          toggleModal={v => this.setState({
            modal: { ...this.state.modal, disclaimer: { open: v } }
          })}
          loading={categories.length === 0}
        >
          <DisclaimerModal
            categories={categories}
            disclaimer={this.state.modal.disclaimer.category}
            onClose={() => this.setState({
              modal: { ...this.state.modal, disclaimer: { open: false } }
            })}
          />
        </Modal>}

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
  loadingCities: PropTypes.bool,
  // download
  cityDownloadOptions: PropTypes.array,
  solutionsDownloadOptions: PropTypes.array,
  bmesDownloadOptions: PropTypes.array
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
  layer: {},
  // download
  cityDownloadOptions: [],
  solutionsDownloadOptions: [],
  bmesDownloadOptions: []
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
    parsedCities: getParsedCities(state),
    // download
    cityDownloadOptions: citiesAsDownload(state),
    solutionsDownloadOptions: solutionsAsDownload(state),
    bmesDownloadOptions: bmesAsDownload(state)
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
    resetBmeFilters() { dispatch(resetBmeFilters()); },
    // map
    getLayer(layerSpec) { dispatch(getLayer(layerSpec)); },
    removeDataLayer() { dispatch(removeDataLayer()); },
    // cities
    getCities() { dispatch(getCities()); }
  })
)(withTracker(ExploreIndex, GA_EXPLORE));

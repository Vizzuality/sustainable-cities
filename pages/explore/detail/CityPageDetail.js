import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import {
  getCities,
  getCityDetail,
  getCityBmes,
  setCityFilters,
  resetCityFilters
} from 'modules/city';

import {
  getSolutionCategories,
  getBmeCategories
} from 'modules/category';

// selectors
import { getParsedProjects, getParsedBmes } from 'selectors/city';
import { bmesAsDownload, citiesAsDownload, solutionsAsDownload } from 'selectors/download';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';
import ItemGallery from 'components/explore/ItemGallery';
import Modal from 'components/common/Modal';
import DownloadDataModal from 'components/common/modal/DownloadDataModal';


class CityDetailPage extends Page {
  constructor(props) {
    super(props);

    this.state = {
      modal: {
        download: false
      }
    };
  }

  componentWillMount() {
    const { id, tab } = this.props.queryParams;
    this.props.setCityFilters({ detailId: id, tab });
    this.props.getCities();
    this.props.getBmeCategories();
    this.props.getSolutionCategories();
  }

  componentDidUpdate(prevProps) {
    const { cityFilters } = this.props;

    if (!isEqual(prevProps.cityFilters, cityFilters)) {
      const { detailId } = cityFilters;
      this.props.getCityDetail(detailId);
      this.props.getCityBmes(detailId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const queryParamsChanged = !isEqual(nextProps.queryParams, this.props.queryParams);

    if (queryParamsChanged) {
      const { id, tab } = nextProps.queryParams;
      this.props.setCityFilters({ detailId: id, tab });
    }
  }

  componentWillUnmount() {
    this.props.resetCityFilters();
  }

  _setBreadcrumbs() {
    const { id, tab } = this.props.queryParams;
    const { name } = this.props.city;
    let breadcrumbs = [
      {
        name: 'Cities',
        route: 'explore-index',
        params: { category: 'cities' }
      }
    ];

    if (tab && name) {
      breadcrumbs = [...breadcrumbs, {
        name,
        route: 'city-detail',
        params: { id }
      }];
    }

    return breadcrumbs;
  }

  render() {
    const {
      city,
      parsedProjects,
      isLoading,
      loadingBmes,
      parsedBmes,
      queryParams,
      cityDownloadOptions,
      bmesDownloadOptions,
      solutionsDownloadOptions
    } = this.props;

    const { name, id } = city;
    const { tab } = queryParams;
    const breadcrumbs = <Breadcrumbs items={this._setBreadcrumbs()} />;

    return (
      <Layout
        title="City detail"
        queryParams={this.props.queryParams}
      >

        <Cover
          title={name || ''}
          size="shorter"
          position="bottom"
          breadcrumbs={breadcrumbs}
        />

        {Object.keys(city).length > 0 && !tab &&
          <div className="row">
            <div className="column small-12">
              <ItemGallery
                showAll={parsedProjects.length > 4}
                title={parsedProjects.length > 1 ? 'Projects in this city' : 'Project in this city'}
                items={parsedProjects}
              />

              <ItemGallery
                showAll={parsedBmes['investment-component'] !== undefined && parsedBmes['investment-component'].length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'investment-component' }
                }}
                items={parsedBmes['investment-component'] !== undefined ?
                  [parsedBmes['investment-component']] : []}
              />

              <ItemGallery
                showAll={parsedBmes['delivery-mechanism'] !== undefined && parsedBmes['delivery-mechanism'].length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'delivery-mechanism' }
                }}
                items={parsedBmes['delivery-mechanism'] !== undefined ?
                  [parsedBmes['delivery-mechanism']] : []}
              />

              <ItemGallery
                showAll={parsedBmes['financial-product'] !== undefined && parsedBmes['financial-product'].length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'financial-product' }
                }}
                items={parsedBmes['financial-product'] !== undefined ?
                  [parsedBmes['financial-product']] : []}
              />

              <ItemGallery
                showAll={parsedBmes.bme !== undefined && parsedBmes.bme.length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'bme' }
                }}
                items={parsedBmes.bme !== undefined ?
                  [parsedBmes.bme] : []}
              />

              <ItemGallery
                showAll={parsedBmes.financing !== undefined && parsedBmes.financing.length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'financing' }
                }}
                items={parsedBmes.financing !== undefined ?
                  [parsedBmes.financing] : []}
              />

              <ItemGallery
                showAll={parsedBmes.funding !== undefined && parsedBmes.funding.length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'funding' }
                }}
                items={parsedBmes.funding !== undefined ?
                  [parsedBmes.funding] : []}
              />

              <ItemGallery
                showAll={parsedBmes['legal-arragements'] !== undefined && parsedBmes['legal-arragements'].length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'legal-arragements' }
                }}
                items={parsedBmes['legal-arragements'] !== undefined ?
                  [parsedBmes['legal-arragements']] : []}
              />

              <ItemGallery
                showAll={parsedBmes['technical-components'] !== undefined && parsedBmes['technical-components'].length > 4}
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'technical-components' }
                }}
                items={parsedBmes['technical-components'] !== undefined ?
                  [parsedBmes['technical-components']] : []}
              />

            </div>
          </div>}

        {tab && <div className="row">
          <div className="column small-12">

            {tab === 'projects' &&
              <ItemGallery
                items={parsedProjects}
              />
            }

            {tab === 'bme' &&
              <ItemGallery
                items={parsedBmes.bme !== undefined ?
                  [parsedBmes.bme] : []}
              />
            }

            {tab === 'financing' &&
              <ItemGallery
                items={parsedBmes.financing !== undefined ?
                  [parsedBmes.financing] : []}
              />
            }

            {tab === 'legal-arragements' &&
              <ItemGallery
                items={parsedBmes['legal-arragements'] !== undefined ?
                  [parsedBmes['legal-arragements']] : []}
              />
            }

            {tab === 'investment-components' &&
              <ItemGallery
                items={parsedBmes['investment-components'] !== undefined ?
                  [parsedBmes['investment-components']] : []}
              />
            }
          </div>
        </div>}

        <Modal
          open={this.state.modal.download}
          toggleModal={v => this.setState({ modal: { download: v } })}
          loading={loadingBmes || isLoading}
        >
          <DownloadDataModal
            bmes={bmesDownloadOptions}
            cities={cityDownloadOptions}
            solutions={solutionsDownloadOptions}
            onClose={() => this.setState({ modal: { download: false } })}
          />
        </Modal>

      </Layout>
    );
  }
}

CityDetailPage.propTypes = {
  city: PropTypes.object,
  cityFilters: PropTypes.object,
  getCityDetail: PropTypes.func,
  isLoading: PropTypes.bool,
  resetCityFilters: PropTypes.func,
  parsedProjects: PropTypes.array,
  parsedBmes: PropTypes.object,
  queryParams: PropTypes.object.isRequired,
  // download
  cityDownloadOptions: PropTypes.array,
  solutionsDownloadOptions: PropTypes.array,
  bmesDownloadOptions: PropTypes.array,
  // bme
  loadingBmes: PropTypes.bool
};

CityDetailPage.defaultProps = {
  city: {},
  cityFilters: {},
  parsedProjects: [],
  parsedBmes: {},
  // download
  cityDownloadOptions: [],
  solutionsDownloadOptions: [],
  bmesDownloadOptions: []
};

export default withRedux(
  store,
  state => ({
    // city
    isLoading: state.city.loading,
    city: state.city.detail,
    cityFilters: state.city.filters,
    // projects
    parsedProjects: getParsedProjects(state),
    parsedBmes: getParsedBmes(state),
    // download
    cityDownloadOptions: citiesAsDownload(state),
    solutionsDownloadOptions: solutionsAsDownload(state),
    bmesDownloadOptions: bmesAsDownload(state),
    // bmes
    loadingBmes: state.bme.loading
  }),
  dispatch => ({
    getCityDetail(id) { dispatch(getCityDetail(id)); },
    setCityFilters(filters) { dispatch(setCityFilters(filters)); },
    resetCityFilters() { dispatch(resetCityFilters()); },
    getCityBmes(id) { dispatch(getCityBmes(id)); },
    getCities() { dispatch(getCities()); },
    // categories
    getSolutionCategories() { dispatch(getSolutionCategories()); },
    getBmeCategories() { dispatch(getBmeCategories()); }
  })
)(CityDetailPage);

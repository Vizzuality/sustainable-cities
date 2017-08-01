import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import {
  getCityDetail,
  getCityBmes,
  setCityFilters,
  resetCityFilters
} from 'modules/city';

// selectors
import { getParsedProjects, getParsedBmes } from 'selectors/city';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';
import ItemGallery from 'components/explore/ItemGallery';
import DownloadData from 'components/common/DownloadData';


class CityDetailPage extends Page {
  componentWillMount() {
    const { id, tab } = this.props.queryParams;
    this.props.setCityFilters({ detailId: id, tab });
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
        name: 'Explore',
        route: 'explore-index',
        params: { category: 'solutions' }
      },
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
      parsedBmes,
      queryParams
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
          breadcrumbs={breadcrumbs}
        />

        {Object.keys(city).length > 0 && !tab &&
          <div className="row">
            <div className="column small-12">
              <ItemGallery
                showAll
                title="Projects in this city"
                items={parsedProjects}
              />

              <ItemGallery
                showAll
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'investment-component' }
                }}
                items={parsedBmes['investment-component'] !== undefined ?
                  [parsedBmes['investment-component']] : []}
              />

              <ItemGallery
                showAll
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'delivery-mechanism' }
                }}
                items={parsedBmes['delivery-mechanism'] !== undefined ?
                  [parsedBmes['delivery-mechanism']] : []}
              />

              <ItemGallery
                showAll
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'financial-product' }
                }}
                items={parsedBmes['financial-product'] !== undefined ?
                  [parsedBmes['financial-product']] : []}
              />

              <ItemGallery
                showAll
                link={{
                  route: 'city-detail',
                  params: { id, tab: 'funding-source' }
                }}
                items={parsedBmes['funding-source'] !== undefined ?
                  [parsedBmes['funding-source']] : []}
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

            {tab === 'investment-component' &&
              <ItemGallery
                items={parsedBmes['investment-component'] !== undefined ?
                  [parsedBmes['investment-component']] : []}
              />
            }

            {tab === 'delivery-mechanism' &&
              <ItemGallery
                items={parsedBmes['delivery-mechanism'] !== undefined ?
                  [parsedBmes['delivery-mechanism']] : []}
              />
            }

            {tab === 'financial-product' &&
              <ItemGallery
                items={parsedBmes['financial-product'] !== undefined ?
                  [parsedBmes['financial-product']] : []}
              />
            }

            {tab === 'funding-source' &&
              <ItemGallery
                items={parsedBmes['funding-source'] !== undefined ?
                  [parsedBmes['funding-source']] : []}
              />
            }
          </div>
        </div>}

        <DownloadData />

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
  queryParams: PropTypes.object.isRequired
};

CityDetailPage.defaultProps = {
  city: {},
  cityFilters: {},
  parsedProjects: [],
  parsedBmes: {}
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
    parsedBmes: getParsedBmes(state)
  }),
  dispatch => ({
    getCityDetail(id) { dispatch(getCityDetail(id)); },
    setCityFilters(filters) { dispatch(setCityFilters(filters)); },
    resetCityFilters() { dispatch(resetCityFilters()); },
    getCityBmes(id) { dispatch(getCityBmes(id)); }
  })
)(CityDetailPage);

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
  static setBreadcrumbs() {
    return [
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
  }

  componentWillMount() {
    const { id } = this.props.queryParams;
    this.props.setCityFilters({ detailId: id });
  }

  componentDidUpdate(prevProps) {
    const { cityFilters } = this.props;

    if (!isEqual(prevProps.cityFilters, cityFilters)) {
      const { detailId } = cityFilters;
      this.props.getCityDetail(detailId);
      this.props.getCityBmes(detailId);
    }
  }

  componentWillUnmount() {
    this.props.resetCityFilters();
  }

  render() {
    const {
      city,
      parsedProjects,
      parsedBmes
    } = this.props;

    const { name } = city;
    const {
      investmentComponents,
      deliveryMechanism,
      financialProduct,
      fundingSource
    } = parsedBmes;
    const breadcrumbs = <Breadcrumbs items={CityDetailPage.setBreadcrumbs()} />;

    return (
      <Layout
        title="City detail"
        queryParams={this.props.queryParams}
      >

        <Cover
          title={name || ''}
          breadcrumbs={breadcrumbs}
        />

        <ItemGallery
          title="Projects in this city"
          items={parsedProjects}
        />

        <ItemGallery
          showAll
          title="Investment component in this city"
          items={investmentComponents || []}
        />

        <ItemGallery
          showAll
          title="Delivery mechanism in this city"
          items={deliveryMechanism || []}
        />

        <ItemGallery
          showAll
          title="Financial product in this city"
          items={financialProduct || []}
        />

        <ItemGallery
          showAll
          title="Funding source in this city"
          items={fundingSource || []}
        />

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

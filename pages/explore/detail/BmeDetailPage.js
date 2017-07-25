import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getBmeDetail, setBmeFilters, removeBmeDetail } from 'modules/bme';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';
import BmeDetail from 'components/explore-detail/BmeDetail';

class BmeDetailPage extends Page {
  static setBreadcrumbs(bme) {
    if (!bme) return null;

    // TO-DO
    return [];
  }

  componentWillMount() {
    const { id } = this.props.queryParams;

    this.props.setBmeFilters({ detailId: id });
  }

  shouldComponentUpdate(nextProps) {
    return (!isEqual(this.props.bmeFilters, nextProps.bmeFilters)) ||
      (!isEqual(this.props.bme, nextProps.bme));
  }

  componentDidUpdate(prevProps) {
    const { bmeFilters } = this.props;

    if (!isEqual(prevProps.bmeFilters, bmeFilters)) {
      const { detailId } = bmeFilters;
      this.props.getBmeDetail(detailId);
    }
  }

  componentWillUnmount() {
    this.props.removeBmeDetail();
  }

  render() {
    const { bme, loadingBmes } = this.props;
    const breadcrumbsItems = BmeDetailPage.setBreadcrumbs(bme);

    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;

    return (
      <Layout
        title="Business model element detail"
        queryParams={this.props.queryParams}
      >
        <Cover
          title={bme.name || ''}
          breadcrumbs={breadcrumbs}
        />

        <BmeDetail
          bme={bme}
          isLoading={loadingBmes}
        />
      </Layout>
    );
  }
}

BmeDetailPage.propTypes = {
  // bmes
  bme: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  getBmeDetail: PropTypes.func,
  removeBmeDetail: PropTypes.func,
  queryParams: PropTypes.object.isRequired
};

BmeDetailPage.defaultProps = {
  bme: {}
};

export default withRedux(
  store,
  state => ({
    // bmes
    loadingBmes: state.bme.loading,
    bme: state.bme.list,
    bmeFilters: state.bme.filters
  }),
  dispatch => ({
    // bme
    getBmeDetail(filters) { dispatch(getBmeDetail(filters)); },
    setBmeFilters(filters) { dispatch(setBmeFilters(filters)); },
    removeBmeDetail() { dispatch(removeBmeDetail()); }
  })
)(BmeDetailPage);

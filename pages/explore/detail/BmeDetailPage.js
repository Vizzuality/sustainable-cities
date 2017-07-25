import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getBmeDetail, removeBmeDetail } from 'modules/bme';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';
import BmeDetail from 'components/explore-detail/BmeDetail';

const getBreadcrumbs = (bme) => {

  const traverse = (category, accumulator = []) => {
    if (!category) {
      return accumulator;
    } else {
      return traverse(category.parent, [category, ...accumulator]);
    }
  }

  return traverse(bme.categories.find((c) => c.categoryType === 'Bme')).map((c) => ({
    name: c.name,
    route: `/categories/${c.id}`
  }));
};

class BmeDetailPage extends Page {

  componentWillMount() {
    const { id } = this.props.queryParams;

    this.props.getBmeDetail({ detailId: id });
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
    const { bme, isLoading } = this.props;

    const breadcrumbsItems = !isEqual(bme, {}) ?
      getBreadcrumbs(bme) : [];

    const breadcrumbs = !isEqual(breadcrumbsItems, []) ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;

    return (
      <Layout
        title='Business model element detail'
        queryParams={this.props.queryParams}
      >
        <Cover
          size='shorter'
          className='-blue'
          title={bme.name || ''}
          breadcrumbs={breadcrumbs}
        />

        <BmeDetail
          bme={bme}
          isLoading={isLoading}
        />

      </Layout>
    );
  }
}

BmeDetailPage.propTypes = {
  bme: PropTypes.object.isRequired,
  getBmeDetail: PropTypes.func,
  removeBmeDetail: PropTypes.func,
  queryParams: PropTypes.object.isRequired
};

BmeDetailPage.defaultProps = {
  bme: {}
};

export default withRedux(
  store,
  (state) => ({
    isLoading: state.bme.loading,
    bme: state.bme.detail,
  }),
  (dispatch) => ({
    getBmeDetail(filters) { dispatch(getBmeDetail(filters)); },
    removeBmeDetail() { dispatch(removeBmeDetail()); }
  })
)(BmeDetailPage);

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

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

const flatten = (category, accumulator = []) => {
  if (category) {
    return flatten(category.parent, [category, ...accumulator]);
  } else {
    return accumulator;
  }
};

const getBreadcrumbs = (bme) => {
  if (isEmpty(bme)) {
    return null;
  }

  const routeName = 'explore-index';
  const routeProps = ['category', 'subCategory', 'children'];
  const flattened = flatten(bme.categories.find((c) => c.categoryType === 'Bme'));
  const breadcrumbs = [];

  flattened.forEach((current) => {
    breadcrumbs.push({
      name: current.name,
      route: routeName,
      params: {
        ...breadcrumbs.map(b => b.params).reduce((current, accumulator) => ({
          ...accumulator,
          ...current
        }), {}),
        [routeProps[breadcrumbs.length]]: current.slug
      }
    });
  });

  return breadcrumbs;
}

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

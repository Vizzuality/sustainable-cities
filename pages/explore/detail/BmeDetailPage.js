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
import DownloadData from 'components/common/DownloadData';
import RelatedContent from 'components/explore-detail/RelatedContent';
import BmeDetail from 'components/explore-detail/BmeDetail';

// constants
import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

const flatten = (category, accumulator = []) => {
  if (category) {
    return flatten(category.parent, [category, ...accumulator]);
  }

  return accumulator;
};

const getBreadcrumbs = (bme) => {
  if (isEmpty(bme)) {
    return null;
  }

  const routeName = 'explore-index';
  const routeProps = ['category', 'subCategory', 'children'];
  const flattened = flatten(bme.categories.find(c => c.categoryType === 'Bme'));
  const breadcrumbs = [];

  flattened.forEach((current) => {
    breadcrumbs.push({
      name: current.name,
      route: routeName,
      params: {
        ...breadcrumbs.map(b => b.params).reduce((c, accumulator) => ({
          ...accumulator,
          ...c
        }), {}),
        [routeProps[breadcrumbs.length]]: current.slug
      }
    });
  });

  return breadcrumbs;
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

    const parentSlug = breadcrumbsItems && breadcrumbsItems[0] ?
      breadcrumbsItems[0].params.category : null;


    return (
      <Layout
        title="Business model element detail"
        queryParams={this.props.queryParams}
      >
        <div className="bme-detail-page">

          {isLoading && (<div>
            Loading bme...
          </div>)}

          {!isLoading && (<div>
            <Cover
              size="shorter"
              className={'-no-veil -bme'}
              color={parentSlug ?
                CATEGORY_FIRST_LEVEL_COLORS[parentSlug] : ''}
              title={bme.name || ''}
              breadcrumbs={breadcrumbs}
            />

            <BmeDetail
              bme={bme}
              isLoading={isLoading}
            />

            <RelatedContent />

            <DownloadData />

          </div>)}

        </div>

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
  state => ({
    isLoading: state.bme.loading || isEmpty(state.bme.detail),
    bme: state.bme.detail
  }),
  dispatch => ({
    getBmeDetail(filters) { dispatch(getBmeDetail(filters)); },
    removeBmeDetail() { dispatch(removeBmeDetail()); }
  })
)(BmeDetailPage);

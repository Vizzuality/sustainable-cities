import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import { Router } from 'routes';

// modules
import { getBmeDetail, removeBmeDetail } from 'modules/bme';
import { getSolutionCategories, getBmeCategories } from 'modules/category';
import { getCities } from 'modules/city';

// selectors
import { bmesAsDownload, citiesAsDownload, solutionsAsDownload } from 'selectors/download';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';
import DownloadData from 'components/common/DownloadData';
import Modal from 'components/common/Modal';
import DownloadDataModal from 'components/common/modal/DownloadDataModal';
import ShareModal from 'components/common/ShareModal';
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
  constructor(props) {
    super(props);


    this.state = {
      modal: {
        download: false
      }
    };
  }

  componentWillMount() {
    const { id } = this.props.queryParams;

    this.props.getBmeDetail({ detailId: id });
    this.props.getBmeCategories();
    this.props.getSolutionCategories();
    this.props.getCities();
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
    const {
      bme,
      isLoading,
      bmesDownloadOptions,
      cityDownloadOptions,
      solutionsDownloadOptions,
      loadingBmes,
      loadingCities,
      loadingSolutions
    } = this.props;

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
            >
              <Button
                primary
                inverse
                onClick={() => this.setState({ modal: { share: true } })}
              >
                Share
              </Button>
            </Cover>

            <BmeDetail
              bme={bme}
              isLoading={isLoading}
            />

            <RelatedContent />

            <DownloadData
              onClickButton={() => this.setState({ modal: { download: true } })}
            />

            <Modal
              open={this.state.modal.download}
              toggleModal={v => this.setState({ modal: { download: v } })}
              loading={loadingBmes || loadingSolutions || loadingCities}
            >
              <DownloadDataModal
                bmes={bmesDownloadOptions}
                cities={cityDownloadOptions}
                solutions={solutionsDownloadOptions}
                onClose={() => this.setState({ modal: { download: false } })}
              />
            </Modal>

            {this.state.modal.share &&
              <ShareModal
                publicProject
                url={window.location}
                onClose={() => this.setState({ modal: { share: false } })}
                onDownload={() => Router.pushRoute('bme-detail-print', { id: this.props.queryParams.id })}
              />
            }

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
  queryParams: PropTypes.object.isRequired,
  // cities
  loadingCities: PropTypes.bool,
  // bmes
  loadingBmes: PropTypes.bool,
  // solutions
  loadingSolutions: PropTypes.bool,
  // download
  cityDownloadOptions: PropTypes.array,
  solutionsDownloadOptions: PropTypes.array,
  bmesDownloadOptions: PropTypes.array
};

BmeDetailPage.defaultProps = {
  bme: {},
  // download
  cityDownloadOptions: [],
  solutionsDownloadOptions: [],
  bmesDownloadOptions: []
};

export default withRedux(
  store,
  state => ({
    isLoading: state.bme.loading || isEmpty(state.bme.detail),
    bme: state.bme.detail,
    // download
    cityDownloadOptions: citiesAsDownload(state),
    solutionsDownloadOptions: solutionsAsDownload(state),
    bmesDownloadOptions: bmesAsDownload(state),
    // loadings
    loadingBmes: state.category.bme.loading,
    loadingSolution: state.category.solution.loading,
    loadingCities: state.city.loading
  }),
  dispatch => ({
    getBmeDetail(filters) { dispatch(getBmeDetail(filters)); },
    removeBmeDetail() { dispatch(removeBmeDetail()); },
    // categories
    getBmeCategories() { dispatch(getBmeCategories()); },
    getSolutionCategories() { dispatch(getSolutionCategories()); },
    // cities
    getCities() { dispatch(getCities()); }
  })
)(BmeDetailPage);

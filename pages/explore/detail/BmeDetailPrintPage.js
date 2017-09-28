import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import withTracker from 'hoc/withTracker';


// modules
import { getBmeDetail, removeBmeDetail } from 'modules/bme';
import { getSolutionCategories, getBmeCategories } from 'modules/category';
import { getCities } from 'modules/city';

// selectors
import { bmesAsDownload, citiesAsDownload, solutionsAsDownload } from 'selectors/download';

// components
import Head from 'components/layout/head';
import Button from 'components/common/Button';
import Page from 'pages/Page';
import BmeDetail from 'components/explore-detail/BmeDetail';

// constants
import { GA_DETAIL_BME_PRINT } from 'constants/analytics';


class BmeDetailPrintPage extends Page {
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

    return (
      <div>
        <Head title="Business model element detail" defaultDescription="" />
        <div className="row u-mt-2">
          <div className="u-flex u-ml-a u-hide-print">
            <Button secondary link={{ route: 'bme-detail', params: { id: this.props.queryParams.id }}} className="u-mr-1">
              Go back
            </Button>

            <Button primary onClick={() => window.print()}>
              Print
            </Button>
          </div>
          <div className="u-w-100 u-flex u-flex-sb u-pt-2 u-pb-2 u-bottom-separator u-align-items-center">
            <h1 className="c-title -fs-huge -fw-thin">{bme.name}</h1>

            <div className="c-text u-flex -fw-bold -uppercase -fs-extrasmall">
              <div className="u-pr-1/2">powered by</div>
              <div className="u-left-separator u-bw-2 u-bc-cc u-pl-1/2">
                <div>financing</div>
                <div>sustainable</div>
                <div>cities</div>
              </div>
            </div>
          </div>
        </div>


        <div className="bme-detail-page">

          {isLoading && (<div>
            Loading bme...
          </div>)}

          {!isLoading && (<div>
            <BmeDetail
              bme={bme}
              isLoading={isLoading}
              print={true}
            />

          </div>)}
        </div>
      </div>
    );
  }
}

BmeDetailPrintPage.propTypes = {
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

BmeDetailPrintPage.defaultProps = {
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
)(withTracker(BmeDetailPrintPage, GA_DETAIL_BME_PRINT));

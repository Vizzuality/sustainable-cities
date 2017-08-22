import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, Router } from 'routes';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import uuidv1 from 'uuid/v1';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getProjectDetail, setProjectFilters, removeProjectDetail } from 'modules/project';
import { getSolutionCategories, getBmeCategories } from 'modules/category';
import { getCities } from 'modules/city';

// selectors
import { bmesAsDownload, citiesAsDownload, solutionsAsDownload } from 'selectors/download';

// utils
import { getImage } from 'utils/project';

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
import ContactForm from 'components/explore-detail/ContactForm';
import SolutionDetail from 'components/explore-detail/SolutionDetail';
import SolutionOverview from 'components/explore-detail/SolutionOverview';
import SolutionCategory from 'components/explore-detail/SolutionCategory';
import { DisclaimerModal } from 'components/common/disclaimer/DisclaimerModal';

// constants
import { CATEGORY_ICONS } from 'constants/category';

class SolutionDetailPage extends Page {
  static setBreadcrumbs(project) {
    if (!Object.keys(project).length) return null;
    const { name, slug, parent } = project.category || {};
    const { name: parentName, slug: parentSlug, level: parentLevel } = parent || {};

    const breadcrumbsItems = [
      {
        name: 'Projects',
        route: 'explore-index',
        params: { category: 'solutions' }
      },
      {
        name,
        route: 'explore-index',
        params: { category: 'solutions', subCategory: slug }
      }
    ];

    // Adds the parent category level if this is not a level-1
    if (!!parentLevel && parentLevel !== 1) {
      breadcrumbsItems.splice(1, 0, {
        name: parentName,
        route: 'explore-index',
        params: { category: 'solutions', subCategory: parentSlug }
      });

      // Tell the breadcrumbs last item is not a link now
      if (breadcrumbsItems[2]) {
        breadcrumbsItems[2] = { ...breadcrumbsItems[2], noLink: true };
      }
    }

    return breadcrumbsItems;
  }

  state = {
    disclaimer: null,
    modal: {
      download: false
    }
  };

  componentWillMount() {
    const { id } = this.props.queryParams;
    this.props.setProjectFilters({ detailId: id });

    this.props.getSolutionCategories();
    this.props.getCities();
  }

  componentDidUpdate(prevProps) {
    const { projectFilters } = this.props;
    if (!isEqual(prevProps.projectFilters, projectFilters)) {
      const { detailId } = projectFilters;
      this.props.getProjectDetail(detailId);
      this.props.getBmeCategories();
    }
  }

  componentWillUnmount() {
    this.props.removeProjectDetail();
  }

  renderTabs() {
    const { project, bmeCategories } = this.props;

    const defaultTabItems = [{
      label: 'Project Details',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id
        }
      }
    }, {
      label: 'Overview',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id,
          subPage: 'overview'
        }
      }
    }];

    const tabItems = [...defaultTabItems, ...(bmeCategories || []).map(bme => ({
      label: bme.name,
      className: 'info',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id,
          subPage: bme.slug
        }
      },
      modal: bme.label ? {
        onClick: () => this.setState({ disclaimer: bme.slug })
      } : null
    }))];

    const tabEqual = (current, tab) => !!(
      tab.route === current.route
      && tab.params && tab.params.id === current.id
      && tab.params.subPage === current.subPage
    );

    return (<div className="c-tabs -explore">
      <div className="row">
        <ul className="tab-list">
          {tabItems.map(tab => (
            <li
              key={uuidv1()}
              className={classnames('tab-item', {
                '-current': tabEqual(this.props.queryParams, tab.queryParams)
              })}
            >
              <Link route={tab.queryParams.route} params={tab.queryParams.params}>
                <a className="literal">{tab.label}</a>
              </Link>

              {tab.modal &&
                <div
                  className="c-info-icon"
                  onClick={() => this.setState({
                    disclaimer: tab.queryParams.params.subPage
                  })}
                >
                  <svg className="icon"><use xlinkHref="#icon-info" /></svg>
                </div>}
            </li>
          ))}
        </ul>
      </div>
    </div>);
  }

  renderContent() {
    const { project, categories, queryParams } = this.props;

    if (!queryParams.subPage) {
      return (
        <SolutionDetail
          project={project}
          categories={categories}
        />
      );
    } else if (queryParams.subPage === 'overview') {
      return (
        <SolutionOverview
          project={project}
        />
      );
    }

    const category = project.bmeTree.find(c => c.slug === queryParams.subPage);
    const projectBmes = project.projectBmes;

    return (
      <SolutionCategory
        category={category}
        projectBmes={projectBmes}
      />
    );
  }

  render() {
    const {
      bmeCategories,
      project,
      isLoading,
      loadingBmes,
      loadingCities,
      loadingSolutions,
      bmesDownloadOptions,
      cityDownloadOptions,
      solutionsDownloadOptions
    } = this.props;
    const breadcrumbsItems = SolutionDetailPage.setBreadcrumbs(project);
    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;
    const categoryIcon = CATEGORY_ICONS[project.categoryLevel2];


    return (
      <Layout
        title="Solution detail"
        queryParams={this.props.queryParams}
      >

        <div className="solution-detail-page">

          {isLoading && (<div>
            Loading project...
          </div>)}

          {!isLoading && (<div>

            <Cover
              title={project.name || ''}
              titleIcon={categoryIcon}
              description={project.tagline}
              breadcrumbs={breadcrumbs}
              size="shorter"
              position="bottom"
              image={getImage(project)}
            >
              <Button
                primary
                inverse
                onClick={() => this.setState({ modal: { share: true } })}
              >
                Share
              </Button>
            </Cover>

            {this.renderTabs()}

            {this.renderContent()}

            <ContactForm />

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

          </div>)}

        </div>

        <DisclaimerModal
          categories={bmeCategories}
          disclaimer={this.state.disclaimer}
          onClose={() => this.setState({ disclaimer: null })}
        />

        {this.state.modal.share && (
          <ShareModal
            publicProject
            url={window.location}
            onClose={() => this.setState({ modal: { share: false } })}
            onDownload={() => Router.pushRoute('solution-detail-print', { id: project.id })}
          />
      )}
      </Layout>
    );
  }
}

SolutionDetailPage.propTypes = {
  // categories
  categories: PropTypes.array,
  // project
  project: PropTypes.object,
  getProjectDetail: PropTypes.func,
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

SolutionDetailPage.defaultProps = {
  project: {},
  categories: [],
  // download
  cityDownloadOptions: [],
  solutionsDownloadOptions: [],
  bmesDownloadOptions: []
};

/* completes the bmeTree root level with missing top-level categories */
const completeBmeTree = (bmeTree, categories) => {
  if (!bmeTree || !categories) {
    return null;
  }

  // Ugly Number() casts used below because `id` types
  // don't match across requests to different endpoints
  const presentBmeIds = bmeTree.map(bme => bme.id);

  return {
    bmeTree: [
      ...bmeTree,
      ...categories
        .filter(category => !presentBmeIds.includes(Number(category.id)))
        .map(category => ({
          id: Number(category.id),
          name: category.name,
          slug: category.slug,
          children: []
        })
      )]
  };
};

export default withRedux(
  store,
  state => ({
    // categories
    bmeCategories: state.category.bme.list,
    // project
    isLoading: (state.project.loading || isEmpty(state.project.detail)),
    project: {
      ...state.project.detail,
      ...completeBmeTree(state.project.detail.bmeTree, state.category.bme.list)
    },
    projectFilters: state.project.filters,
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
    getProjectDetail(filters) { dispatch(getProjectDetail(filters)); },
    getSolutionCategories() { dispatch(getSolutionCategories()); },
    getBmeCategories() { dispatch(getBmeCategories()); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); },
    // cities
    getCities() { dispatch(getCities()); }
  })
)(SolutionDetailPage);

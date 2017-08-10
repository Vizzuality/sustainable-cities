import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getProjectDetail, setProjectFilters, removeProjectDetail } from 'modules/project';
import { getSolutionCategories, getBmeCategories } from 'modules/category';

// utils
import { getImage } from 'utils/project';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';
import Breadcrumbs from 'components/common/Breadcrumbs';
import DownloadData from 'components/common/DownloadData';
import RelatedContent from 'components/explore-detail/RelatedContent';
import ContactForm from 'components/explore-detail/ContactForm';
import SolutionDetail from 'components/explore-detail/SolutionDetail';
import SolutionOverview from 'components/explore-detail/SolutionOverview';
import SolutionCategory from 'components/explore-detail/SolutionCategory';

// modal
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
    disclaimer: null
  };

  componentWillMount() {
    const { id } = this.props.queryParams;
    this.props.setProjectFilters({ detailId: id });
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
    const { project } = this.props;

    const defaultTabItems = [{
      label: 'Project Details',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id
        }
      },
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

    const tabItems = [...defaultTabItems, ...(project.bmeTree || []).map((bme) => ({
      label: bme.name,
      className: 'info',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id,
          subPage: bme.slug
        }
      }
    }))];

    const tabEqual = (current, tab) => {
      return !!(
        tab.route == current.route
        && tab.params && tab.params.id == current.id
        && tab.params.subPage == current.subPage
      )
    };

    return (<div className="c-tabs -explore">
      <div className="row">
        <ul className="tab-list">
          {tabItems.map((tab, n) => (
            <li
              key={n}
              className={classnames("tab-item", { "-current": tabEqual(this.props.queryParams, tab.queryParams) })}
            >

              <Link route={tab.queryParams.route} params={tab.queryParams.params}>
                <a className="literal">{tab.label}</a>
              </Link>

              {[].includes(tab.queryParams.params.subPage) && (<div
                className="c-info-icon"
                onClick={() => this.setState({
                  disclaimer: tab.queryParams.params.subPage
                })}
              >
                <svg className="icon"><use xlinkHref="#icon-info" /></svg>
              </div>)}

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
      )
    } else if (queryParams.subPage === "overview") {
      return (
        <SolutionOverview
          project={project}
        />
      )
    } else {
      let category = project.bmeTree.find((c) => c.slug === queryParams.subPage);
      let projectBmes = project.projectBmes;

      return (
        <SolutionCategory
          category={category}
          projectBmes={projectBmes}
        />
      )
    }
  }

  render() {
    const { project, categories, isLoading } = this.props;

    const breadcrumbsItems = SolutionDetailPage.setBreadcrumbs(project);
    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;
    const categoryIcon = CATEGORY_ICONS[project.categoryLevel2];

    return (
      <Layout
        title="Solution detail"
        queryParams={this.props.queryParams}
      >

        <div className='solution-detail-page'>

          {isLoading && (<div>
            Loading project...
          </div>)}

          {!isLoading && (<div>

            <Cover
              title={project.name || ''}
              titleIcon={categoryIcon}
              description={project.tagline}
              breadcrumbs={breadcrumbs}
              size='shorter'
              position='bottom'
              image={getImage(project)}
            />

            {this.renderTabs()}

            {this.renderContent()}

            <ContactForm />

            <RelatedContent />

            <DownloadData />

          </div>)}

        </div>

        <DisclaimerModal
          disclaimer={this.state.disclaimer}
          onClose={() => this.setState({ disclaimer: null })}
        />

      </Layout>
    );
  }
}

SolutionDetailPage.propTypes = {
  // projects
  project: PropTypes.object,
  getProjectDetail: PropTypes.func,
  queryParams: PropTypes.object.isRequired
};

SolutionDetailPage.defaultProps = {
  project: {}
};

/* completes the bmeTree root level with missing top-level categories */
const completeBmeTree = (bmeTree, categories) => {
  if (!bmeTree || !categories) {
    return null;
  }

  // Ugly Number() casts used below because `id` types don't match across requests to different endpoints
  const presentBmeIds = bmeTree.map((bme) => bme.id);

  return {
    bmeTree: [...bmeTree, ...categories.filter(category => !presentBmeIds.includes(Number(category.id))).map(category => ({
      id: Number(category.id),
      name: category.name,
      slug: category.slug,
      children: []
    }))]
  };
};

export default withRedux(
  store,
  state => ({
    // projects
    isLoading: (state.project.loading || isEmpty(state.project.detail)),
    project: {
      ...state.project.detail,
      ...completeBmeTree(state.project.detail.bmeTree, state.category.bme.list)
    },
    projectFilters: state.project.filters
  }),
  dispatch => ({
    // projects
    getProjectDetail(filters) { dispatch(getProjectDetail(filters)); },
    getSolutionCategories() { dispatch(getSolutionCategories()) },
    getBmeCategories() { dispatch(getBmeCategories()) },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); }
  })
)(SolutionDetailPage);

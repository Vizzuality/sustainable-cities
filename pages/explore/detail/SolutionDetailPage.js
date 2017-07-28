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

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';
import Breadcrumbs from 'components/common/Breadcrumbs';
import DownloadData from 'components/common/DownloadData';
import RelatedContent from 'components/explore-detail/RelatedContent';
import ContactForm from 'components/explore-detail/ContactForm';
import ProjectDetail from 'components/explore-detail/ProjectDetail';
import ProjectDetailOverview from 'components/explore-detail/ProjectDetailOverview';
import ProjectDetailCategory from 'components/explore-detail/ProjectDetailCategory';

class SolutionDetailPage extends Page {
  static setBreadcrumbs(project) {
    if (!Object.keys(project).length) return null;
    const { name, slug } = project.category || {};

    return [
      {
        name: 'Solutions',
        route: 'explore-index',
        params: { category: 'solutions' }
      },
      {
        name,
        route: 'explore-index',
        params: { category: 'solutions', subCategory: slug }
      }
    ];
  }

  componentWillMount() {
    const { id } = this.props.queryParams;
    this.props.setProjectFilters({ detailId: id });
  }

  shouldComponentUpdate(nextProps) {
    return (!isEqual(this.props.projectFilters, nextProps.projectFilters)) ||
      (!isEqual(this.props.project, nextProps.project));
  }

  componentDidUpdate(prevProps) {
    const { projectFilters } = this.props;

    if (!isEqual(prevProps.projectFilters, projectFilters)) {
      const { detailId } = projectFilters;
      this.props.getProjectDetail(detailId);
    }
  }

  componentWillUnmount() {
    this.props.removeProjectDetail();
  }

  renderTabs(tabs) {
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
					 {tabs.map((tab, n) => (
						 <li
							 key={n}
							 className={classnames("tab-item", { "-current": tabEqual(this.props.queryParams, tab.queryParams) })}
						 >
              <Link route={tab.queryParams.route} params={tab.queryParams.params}>
							  <a className="literal">{tab.label}</a>
              </Link>
						 </li>
         ))}
				 </ul>
			</div>
		</div>);
  }

  renderContent() {
    const { project, queryParams } = this.props;

    if (!queryParams.subPage) {
      return (
        <ProjectDetail
          project={project}
        />
      )
    } else if (queryParams.subPage === "overview") {
      return (
        <ProjectDetailOverview
          project={project}
        />
      )
    } else {
      let category = project.bmeTree.find((c) => c.slug === queryParams.subPage);
      return (
        <ProjectDetailCategory
          category={category}
        />
      )
    }
  }

  render() {
    const { project, isLoading } = this.props;
    const breadcrumbsItems = SolutionDetailPage.setBreadcrumbs(project);
    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;

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
              breadcrumbs={breadcrumbs}
              size='shorter'
              position='bottom'
            />

            {this.renderTabs(tabItems)}

            {this.renderContent()}

            <ContactForm />

            <RelatedContent />

            <DownloadData />

          </div>)}

        </div>

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

export default withRedux(
  store,
  state => ({
    // projects
    isLoading: (state.project.loading || isEmpty(state.project.detail)),
    project: state.project.detail,
    projectFilters: state.project.filters
  }),
  dispatch => ({
    // projects
    getProjectDetail(filters) { dispatch(getProjectDetail(filters)); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); }
  })
)(SolutionDetailPage);

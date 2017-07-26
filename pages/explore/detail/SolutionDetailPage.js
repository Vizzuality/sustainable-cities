import React from 'react';
import PropTypes from 'prop-types';
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
import ProjectDetail from 'components/explore-detail/ProjectDetail';

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

  render() {
    const { project, isLoading } = this.props;
    const breadcrumbsItems = SolutionDetailPage.setBreadcrumbs(project);

    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;

    const tabItems = [];

    console.log(project);

    return (
      <Layout
        title="Solution detail"
        queryParams={this.props.queryParams}
      >

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

          <Tab
            items={tabItems}
            queryParams={this.props.queryParams}
          />

          <ProjectDetail
            project={project}
          />

          <DownloadData />

        </div>)}

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

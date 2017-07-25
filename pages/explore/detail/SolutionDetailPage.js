import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getProjectDetail, setProjectFilters, removeProjectDetail } from 'modules/project';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';
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
    const { project, loadingProjects } = this.props;
    const breadcrumbsItems = SolutionDetailPage.setBreadcrumbs(project);

    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;

    return (
      <Layout
        title="Solution detail"
        queryParams={this.props.queryParams}
      >
        <Cover
          title={project.name || ''}
          breadcrumbs={breadcrumbs}
        />

        <ProjectDetail
          project={project}
          isLoading={loadingProjects}
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

export default withRedux(
  store,
  state => ({
    // projects
    loadingProjects: state.project.loading,
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

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getProjectDetail, setProjectFilters, removeProjectDetail } from 'modules/project';
import { getBmes, setBmeFilters } from 'modules/bme';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';
import ProjectDetail from 'components/explore-detail/ProjectDetail';
import BmeDetail from 'components/explore-detail/BmeDetail';


class ExploreDetail extends Page {
  static generateSolutionBreadcrumbs(project) {
    if (!project) return null;
    const { name, slug } = project ? project.category : {};

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

  // TO-DO
  static generateBmeBreadcrumbs(bme) {
    return bme;
  }

  componentWillMount() {
    const { id, type } = this.props.queryParams;

    if (type === 'solutions') {
      this.props.setProjectFilters({ detailId: id });
    }

    if (type === 'bme') {
      this.props.setBmeFilters({ detailId: id });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { bmeFilters, projectFilters, queryParams } = nextProps;
    const { type } = queryParams;

    if (type === 'solutions' && !isEqual(this.props.projectFilters, projectFilters)) {
      const { detailId } = projectFilters;
      this.props.getProjectDetail(detailId);
    }

    if (type === 'bme' && !isEqual(this.props.bmeFilters, bmeFilters)) {
      this.props.getBmes(bmeFilters);
    }
  }

  componentWillUnmount() {
    this.props.removeProjectDetail();
  }

  render() {
    const { project, bme, loadingProjects, loadingBmes, queryParams } = this.props;
    const { type } = queryParams;
    let breadcrumbsItems = null;

    if (Object.keys(project).length) {
      breadcrumbsItems = ExploreDetail.generateSolutionBreadcrumbs(project);
    }

    if (Object.keys(bme).length) {
      breadcrumbsItems = ExploreDetail.generateBmeBreadcrumbs(bme);
    }

    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;

    return (
      <Layout
        title="Explore detail"
        queryParams={this.props.queryParams}
      >
        <Cover title={project.name || ''} breadcrumbs={breadcrumbs} />

        {type === 'solutions' && project
          && <ProjectDetail
            project={project}
            isLoading={loadingProjects}
          />}

        {type === 'bme' &&
          <BmeDetail
            bme={bme}
            isLoading={loadingBmes}
          />}
      </Layout>
    );
  }
}

ExploreDetail.propTypes = {
  // projects
  project: PropTypes.object,
  getProjectDetail: PropTypes.func,
  // bmes
  bme: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  getBmes: PropTypes.func,
  queryParams: PropTypes.object.isRequired
};

ExploreDetail.defaultProps = {
  project: {}
};

export default withRedux(
  store,
  state => ({
    // projects
    loadingProjects: state.project.loading,
    project: state.project.detail,
    projectFilters: state.project.filters,
    // bmes
    loadingBmes: state.bme.loading,
    bme: state.bme.list,
    bmeFilters: state.bme.filters
  }),
  dispatch => ({
    // projects
    getProjectDetail(filters) { dispatch(getProjectDetail(filters)); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); },
    // bme
    getBmes(filters) { dispatch(getBmes(filters)); },
    setBmeFilters(filters) { dispatch(setBmeFilters(filters)); }
  })
)(ExploreDetail);

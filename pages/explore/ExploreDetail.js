import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getProjects, setProjectFilters, removeProjectDetail } from 'modules/project';
import { getBmes, setBmeFilters } from 'modules/bme';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
// import Cover from 'components/common/Cover';
// import Breadcrumbs from 'components/common/Breadcrumbs';
import ProjectDetail from 'components/explore/ProjectDetail';
import BmeDetail from 'components/explore/BmeDetail';


class ExploreDetail extends Page {

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
      this.props.getProjects(projectFilters);
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
    const { type, id } = queryParams;

    // const categoryItem = ExploreDetail.getCategory(category);
    // const breadcrumbs = (
    //   <Breadcrumbs
    //     items={[
    //       {
    //         name: categoryItem.label,
    //         route: 'explore-index',
    //         params: { category }
    //       }
    //     ]}
    //   />
    // );

    return (
      <Layout
        title="Explore detail"
        queryParams={this.props.queryParams}
      >
        {/*<Cover title={id} breadcrumbs={breadcrumbs} />*/}

        <h1>Explore list</h1>
        <strong>Type: </strong> {type}<br />
        <strong>Id: </strong> {id}

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
  project: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  getProjects: PropTypes.func,
  // bmes
  bme: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  getBmes: PropTypes.func,
  queryParams: PropTypes.object.isRequired
};


export default withRedux(
  store,
  state => ({
    // projects
    loadingProjects: state.project.loading,
    project: state.project.list,
    projectFilters: state.project.filters,
    // bmes
    loadingBmes: state.bme.loading,
    bme: state.bme.list,
    bmeFilters: state.bme.filters
  }),
  dispatch => ({
    // projects
    getProjects(filters) { dispatch(getProjects(filters)); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); },
    // bme
    getBmes(filters) { dispatch(getBmes(filters)); },
    setBmeFilters(filters) { dispatch(setBmeFilters(filters)); }
  })
)(ExploreDetail);

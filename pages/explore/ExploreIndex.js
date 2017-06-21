import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getCategories, setCategoryFilters } from 'modules/category';
import { getProjects, setProjectFilters } from 'modules/project';

// selectors
import { getCategoriesByType } from 'selectors/category';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';
import GridList from 'components/common/GridList';

// constants
import { EXPLORE_TABS } from 'constants/explore';

class ExploreIndex extends Page {

  componentWillMount() {
    const { category, subCategory } = this.props.queryParams;

    this.props.setProjectFilters({
      bme: category !== 'solutions' ? subCategory || category : null,
      solution: category === 'solutions' && subCategory ? subCategory : null
    });

    this.props.getCategories(this.props.categoryFilters);
    this.props.getProjects(this.props.projectFilters);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects) {
      this.projectList = nextProps.projects.map(project => (
        {
          title: project.name,
          subtitle: project['project-type'],
          link: {
            route: 'explore-detail',
            params: {
              category: project['category-id'],
              id: project.id
            }
          }
        }
      ));
    }

    if (!isEqual(this.props.queryParams, nextProps.queryParams)) {
      const { category, subCategory } = nextProps.queryParams;

      this.props.setProjectFilters({
        bme: category !== 'solutions' ? subCategory || category : null,
        solution: category === 'solutions' && subCategory ? subCategory : null
      });
    }

    if (!isEqual(this.props.projectFilters, nextProps.projectFilters)) {
      this.props.getProjects(nextProps.projectFilters);
    }
  }


  render() {
    const { loadingProjects, queryParams } = this.props;
    const { category, subCategory } = queryParams;

    // This is a temporary variable to show some content
    // eslint-disable-next-line
    const description = `Solution description lorem ipusm casius tesebe erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
      porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi
      erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.`;

    return (
      <Layout
        title="Explore"
        queryParams={queryParams}
      >
        <Cover title="Explore" description={description} />
        <h1>Explore Index</h1>
        <strong>Category?: </strong> {category || '–'}<br />
        <strong>Sub-category?: </strong> {subCategory || '–'}
        <Tab
          allowAll
          className="-explore"
          items={EXPLORE_TABS}
          queryParams={queryParams}
        />
        {loadingProjects ?
          <div>Loading projects...</div> : <GridList items={this.projectList} />}
      </Layout>
    );
  }
}

ExploreIndex.propTypes = {
  // categories
  categories: PropTypes.array,
  categoryFilters: PropTypes.object,
  // projects
  loadingProjects: PropTypes.bool,
  projectFilters: PropTypes.object,
  projects: PropTypes.array,
  // queryParams
  queryParams: PropTypes.object.isRequired
};

ExploreIndex.defaultProps = {
  projects: [],
  solutionCategories: []
};

export default withRedux(
  store,
  state => ({
    // categories
    categories: state.category.list,
    categoryFilters: state.category.filters,
    // getCategoriesByTypeX: getCategoriesByType(state),
    // projects
    loadingProjects: state.project.loading,
    projects: state.project.list,
    projectFilters: state.project.filters
  }),
  dispatch => ({
    // categories
    getCategories(filters) { dispatch(getCategories(filters)); },
    setCategoryFilters(filters) { dispatch(setCategoryFilters(filters)); },
    // projects
    getProjects(filters) { dispatch(getProjects(filters)); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); }
  })
)(ExploreIndex);

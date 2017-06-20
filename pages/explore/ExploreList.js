import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { EXPLORE_TABS } from 'constants/explore';

// Components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import GridList from 'components/common/GridList';
import GridSlider from 'components/common/GridSlider';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';

export default class ExploreList extends Page {

  static getCategory(slug) {
    return EXPLORE_TABS.find(category => category.query.category === slug);
  }

  render() {
    const { category, subCategory } = this.props.queryParams;

    const sample = [
      {
        title: 'Capital Bikeshare',
        subtitle: 'Washington DC',
        link: 'https://www.duckduckgo.com'
      },
      {
        title: 'Citi Bike',
        subtitle: 'NYC',
        link: {
          route: 'explore-index'
        }
      },
      {
        title: 'Divvy',
        subtitle: 'Chicago',
        link: {
          route: 'explore-detail',
          params: { category: 'bike-sharing', slug: 'divyy', id: 3 }
        }
      },
      {
        title: 'Hubway',
        subtitle: 'Boston'
      },
      {
        title: 'BiciMad',
        subtitle: 'Madrid'
      }
    ];

    const categoryItem = ExploreList.getCategory(category);
    const breadcrumbs = (
      <Breadcrumbs
        items={[
          {
            name: categoryItem.label,
            route: 'explore-index',
            params: { category }
          }
        ]}
      />
    );

    return (
      <Layout
        title="Explore list"
        queryParams={this.props.queryParams}
      >
        <Cover title={subCategory} breadcrumbs={breadcrumbs} />

        <h1>Explore list</h1>
        <strong>Category: </strong> {category}<br />
        <strong>Sub-category: </strong> {subCategory}
        <GridList items={sample} />
        <GridSlider items={[...sample, ...sample]} layout="portrait" />
      </Layout>
    );
  }
}

ExploreList.propTypes = {
  queryParams: PropTypes.object.isRequired
};

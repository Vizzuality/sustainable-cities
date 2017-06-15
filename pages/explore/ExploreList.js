import React from 'react';
import PropTypes from 'prop-types';

// Components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import GridList from 'components/common/GridList';
import GridSlider from 'components/common/GridSlider';

export default class ExploreList extends Page {
  render() {
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

    return (
      <Layout
        title="Explore list"
        queryParams={this.props.queryParams}
      >
        <h1>Explore list</h1>
        <strong>Category: </strong> {this.props.category}<br />
        <strong>Sub-category: </strong> {this.props.subCategory}
        <GridList items={sample} />
        <GridSlider items={[...sample, ...sample]} layout="portrait" />
      </Layout>
    );
  }
}

ExploreList.propTypes = {
  queryParams: PropTypes.object.isRequired
};

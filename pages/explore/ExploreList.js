import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout';

// Components
import GridList from 'components/common/GridList';

export default class ExploreList extends React.Component {
  static async getInitialProps({ query }) {
    return {
      category: query.category,
      subCategory: query.subCategory
    };
  }

  render() {
    const sample = [
      {
        title: 'Capital Bikeshare',
        subtitle: 'Washington DC'
      },
      {
        title: 'Citi Bike',
        subtitle: 'NYC'
      },
      {
        title: 'Divvy',
        subtitle: 'Chicago'
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
      <Layout title="Explore list">
        <h1>Explore list</h1>
        <strong>Category: </strong> {this.props.category}<br />
        <strong>Sub-category: </strong> {this.props.subCategory}
        <GridList items={sample} />
      </Layout>
    );
  }
}

ExploreList.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired
};

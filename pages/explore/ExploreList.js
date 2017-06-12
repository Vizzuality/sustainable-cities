import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout';

export default class ExploreList extends React.Component {
  static async getInitialProps({ query }) {
    return {
      category: query.category,
      subCategory: query.subCategory
    };
  }

  render() {
    return (
      <Layout title="Explore list">
        <h1>Explore list</h1>
        <strong>Category: </strong> {this.props.category}<br />
        <strong>Sub-category: </strong> {this.props.subCategory}
      </Layout>
    );
  }
}

ExploreList.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired
};

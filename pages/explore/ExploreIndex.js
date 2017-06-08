import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout';

export default class ExploreIndex extends React.Component {
  static async getInitialProps({ query }) {
    return {
      category: query.category,
      subCategory: query.subCategory
    };
  }

  render() {
    return (
      <Layout title="Explore">
        <h1>Explore Index</h1>
        <strong>Category?: </strong> {this.props.category || '–'}<br />
        <strong>Sub-category?: </strong> {this.props.subCategory || '–'}
      </Layout>
    );
  }
}

ExploreIndex.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string
};

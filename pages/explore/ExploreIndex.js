import React from 'react';
import PropTypes from 'prop-types';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';

export default class ExploreIndex extends Page {
  render() {
    const { category, subCategory } = this.props.queryParams;
    return (
      <Layout
        title="Explore"
        queryParams={this.props.queryParams}
      >
        <h1>Explore Index</h1>
        <strong>Category?: </strong> {category || '–'}<br />
        <strong>Sub-category?: </strong> {subCategory || '–'}
      </Layout>
    );
  }
}

ExploreIndex.propTypes = {
  queryParams: PropTypes.object,
  subCategory: PropTypes.string
};

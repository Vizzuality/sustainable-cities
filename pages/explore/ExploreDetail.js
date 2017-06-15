import React from 'react';
import PropTypes from 'prop-types';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';

export default class ExploreDetail extends Page {
  render() {
    const { category, id, slug } = this.props.queryParams;
    return (
      <Layout
        title="Explore detail"
        queryParams={this.props.queryParams}
      >
        <h1>Explore list</h1>
        <strong>Category: </strong> {category}<br />
        <strong>Slug: </strong> {slug}<br />
        <strong>Id: </strong> {id}
      </Layout>
    );
  }
}

ExploreDetail.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  queryParams: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
};

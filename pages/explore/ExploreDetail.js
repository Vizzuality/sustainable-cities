import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout';

export default class ExploreDetail extends React.Component {
  static async getInitialProps({ query }) {
    return {
      category: query.category,
      slug: query.slug,
      id: query.id
    };
  }

  render() {
    return (
      <Layout title="Explore detail">
        <h1>Explore list</h1>
        <strong>Category: </strong> {this.props.category}<br />
        <strong>Slug: </strong> {this.props.slug}<br />
        <strong>Id: </strong> {this.props.id}
      </Layout>
    );
  }
}

ExploreDetail.propTypes = {
  category: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

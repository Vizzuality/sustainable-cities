import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';

export default class HomePage extends Page {
  render() {
    return (
      <Layout
        title="Home"
        queryParams={this.props.queryParams}
      >
        Hi there! Welcome to Sustainable Cities!
        <br />
        <Link route="explore-index">Explore index page</Link>
        <br />
        <Link route="explore-list" params={{ category: 'solutions', subCategory: 'bike-sharing' }}>Explore list page</Link>
        <br />
        <Link route="explore-detail" params={{ category: 'solutions', id: 1 }}>Explore detail page</Link>
      </Layout>
    );
  }
}

HomePage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

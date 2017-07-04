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
        <Link route="explore-index" params={{ category: 'solutions' }}><a>Explore index page</a></Link>
        <br />
        <Link route="explore-detail" params={{ type: 'solutions', id: 1 }}><a>Explore detail page</a></Link>
      </Layout>
    );
  }
}

HomePage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

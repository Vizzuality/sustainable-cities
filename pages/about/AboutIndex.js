import React from 'react';
import PropTypes from 'prop-types';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';

export default class AboutPage extends Page {
  render() {
    return (
      <Layout
        title="About"
        queryParams={this.props.queryParams}
      >
        This is the about page (WIP)
      </Layout>
    );
  }
}

AboutPage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

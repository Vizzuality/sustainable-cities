import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import withRedux from 'next-redux-wrapper';
import uuidv1 from 'uuid/v1';

import { store } from 'store';
import withTracker from 'hoc/withTracker';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';

// content
import CitySupport from 'components/about/CitySupport';


// constants
import { GA_ABOUT } from 'constants/analytics';

class CitySupportPage extends Page {

  render() {
    return (
      <Layout
        title="About"
        queryParams={this.props.queryParams}
      >
        <div className="about-page">
          <Cover
            title="City Support"
            size="shorter"
            image="/static/images/city-support-header.jpg"
          />

          < CitySupport />
        </div>
      </Layout>
    );
  }
}

CitySupportPage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

export default withRedux(store)(withTracker(CitySupportPage, GA_ABOUT));

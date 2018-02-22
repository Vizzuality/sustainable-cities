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
import Events from 'components/about/Events';

// constants
import { GA_ABOUT } from 'constants/analytics';


class EventsPage extends Page {

  render() {
    return (
      <Layout
        title="About"
        queryParams={this.props.queryParams}
      >
        <div className="about-page">
          <Cover
            title="FSCI Events"
            size="shorter"
            image="/static/images/about-header.jpeg"
          />

          <Events />
        </div>
      </Layout>
    );
  }
}

EventsPage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

export default withRedux(store)(withTracker(EventsPage, GA_ABOUT));

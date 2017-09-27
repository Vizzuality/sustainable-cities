import React from 'react';
import PropTypes from 'prop-types';

// Libraries
let GA;
if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  GA = require('react-ga');
  /* eslint-enable global-require */
  const gaTrackingId = process.env.NODE_ENV === 'production' ?
    process.env.GA_TRACKING_ID : 'UA-XXXXXXX-XX';
  GA.initialize(gaTrackingId);
}


const withTracker = (Page, options = {}) => {
  const trackPage = (page) => {
    GA.event({
      page,
      category: page,
      action: 'Navigation',
      label: page,
      ...options
    });

    GA.pageview(page);
  };

  const HOC = class extends React.Component {
    static async getInitialProps(context) {
      let props;
      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context);
      }

      return { ...props };
    }

    componentDidMount() {
      const page = this.props.url.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.url.pathname;
      const nextPage = nextProps.url.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };

  HOC.propTypes = {
    url: PropTypes.object
  };

  return HOC;
};


export default withTracker;

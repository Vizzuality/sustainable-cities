import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Router, routes } from 'routes';
import { store } from 'store';
import useragent from 'express-useragent';
// modules
import { getBmes, getEnablings, getSolutions } from 'modules/builder-api';
import { fetchBM } from 'modules/builder';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import NotSupported from 'pages/builder/NotSupported';

export default (Component) => {
  const BuilderPageComponent = class extends Page {
    static async getInitialProps({ req, pathname, query, isServer }) {
      const route = routes.find(r => r.page === pathname);
      const parseParams = {};

      // next doesn't evaluates null values, so we have to do it manually
      Object.keys(query).forEach((k) => {
        parseParams[k] = query[k] === 'null' ? null : query[k];
      });

      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
      const ua = useragent.parse(userAgent);

      return {
        queryParams: {
          route: route ? route.name : '',
          ...parseParams
        },
        isServer,
        isMobile: ua.isMobile
      };
    }

    componentDidMount() {
      if (this.props.isMobile) return;

      if (this.props.businessModelId) {
        this.props.fetchBM(this.props.businessModelId);
      }

      if (!this.props.businessModelId && this.props.rememberedBusinessModelId) {
        Router.pushRoute(`${document.location.origin}/builder/w${this.props.rememberedBusinessModelId}`);
        return;
      }

      this.props.getBmes();
      this.props.getSolutions();
      this.props.getEnablings();
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.businessModelId !== nextProps.businessModelId && nextProps.businessModelId) {
        this.props.fetchBM(nextProps.businessModelId);
      }

      if (this.props.rememberedBusinessModelId !== nextProps.rememberedBusinessModelId
        && nextProps.rememberedBusinessModelId) {
        if (nextProps.queryParams.route === 'builder-project') {
          Router.pushRoute(`${document.location.origin}/builder/w${nextProps.rememberedBusinessModelId}/project`);
        } else {
          Router.pushRoute(`${document.location.origin}/builder/w${nextProps.rememberedBusinessModelId}`);
        }
      }
    }

    render() {
      const content = this.props.isMobile ?
        (
          <Layout
            title="Builder"
            queryParams={this.props.queryParams}
            className="builder-index"
          >
            <NotSupported />
          </Layout>
        ) : (
          <Component
            queryParams={this.props.queryParams}
            bmRouteParams={this.props.bmRouteParams}
            businessModelId={this.props.businessModelId}
          />);

      return content;
    }
  };

  return withRedux(
    store,
    (state, ownProps) => ({
      businessModelId: ownProps.url.query.id,
      bmRouteParams: ownProps.url.query,
      rememberedBusinessModelId: state.builder.props.writableId
    }),
    {
      getBmes,
      getSolutions,
      getEnablings,
      fetchBM
    },
  )(BuilderPageComponent);
};


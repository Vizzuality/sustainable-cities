import React from 'react';
import withRedux from 'next-redux-wrapper';

import { Router } from 'routes';
import { store } from 'store';
import { getBmes, getEnablings, getSolutions } from 'modules/builder-api';
import { fetchBM } from 'modules/builder';
import Page from 'pages/Page';


export default (Component) => {
  const BuilderPageComponent = class extends Page {
    componentWillMount() {
      if (this.props.businessModelId) {
        this.props.fetchBM(this.props.businessModelId);
      }

      if (!this.props.businessModelId && this.props.rememberedBusinessModelId) {
        Router.pushRoute(document.location.origin + "/builder/w" + this.props.rememberedBusinessModelId);
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

      if (this.props.rememberedBusinessModelId !== nextProps.rememberedBusinessModelId && nextProps.rememberedBusinessModelId) {
        if (nextProps.queryParams.route === 'builder-project') {
          Router.pushRoute(document.location.origin + "/builder/w" + nextProps.rememberedBusinessModelId + "/project");
        } else {
          Router.pushRoute(document.location.origin + "/builder/w" + nextProps.rememberedBusinessModelId);
        }
      }
    }

    render() {
      return (
        <Component
          queryParams={this.props.queryParams}
          bmRouteParams={this.props.bmRouteParams}
          businessModelId={this.props.businessModelId}
        />
      );
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


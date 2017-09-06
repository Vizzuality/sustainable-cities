import React from 'react';
import routes from 'routes';

export default class Page extends React.Component {
  static async getInitialProps({ pathname, query, isServer }) {
    const route = routes.routes.find(r => r.page === pathname);

    const parseParams = {};

    // next doesn't evaluates null values, so we have to do it manually
    Object.keys(query).forEach((k) => {
      parseParams[k] = query[k] === 'null' ? null : query[k];
    });

    return {
      queryParams: {
        route: route ? route.name : '',
        ...parseParams
      },
      isServer
    };
  }
}

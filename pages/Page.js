import React from 'react';
import routes from 'routes';

export default class Page extends React.Component {
  static async getInitialProps({ pathname, query }) {
    const route = routes.routes.find(r => r.page === pathname);

    return {
      queryParams: {
        route: route ? route.name : '',
        ...query
      }
    };
  }
}

import React from 'react';

export default class Page extends React.Component {
  static async getInitialProps({ query, asPath }) {
    const route = asPath.split('/').length > 1 ? asPath.split('/')[1] : '/';
    // add as many params as needed
    const { category, subCategory } = query;
    return {
      queryParams: {
        route,
        category,
        subCategory
      }
    };
  }
}

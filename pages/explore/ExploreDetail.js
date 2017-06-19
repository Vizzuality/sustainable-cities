import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { EXPLORE_TABS } from 'constants/explore';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Breadcrumbs from 'components/common/Breadcrumbs';

export default class ExploreDetail extends Page {

  static getCategory(slug) {
    return EXPLORE_TABS.find(category => category.query.category === slug);
  }

  render() {
    const { category, id, slug } = this.props.queryParams;

    const categoryItem = ExploreDetail.getCategory(category);
    const breadcrumbs = (
      <Breadcrumbs
        items={[
          {
            name: categoryItem.label,
            route: 'explore-index',
            params: { category }
          }
        ]}
      />
    );

    return (
      <Layout
        title="Explore detail"
        queryParams={this.props.queryParams}
      >
        <Cover title={id} breadcrumbs={breadcrumbs} />

        <h1>Explore list</h1>
        <strong>Category: </strong> {category}<br />
        <strong>Slug: </strong> {slug}<br />
        <strong>Id: </strong> {id}
      </Layout>
    );
  }
}

ExploreDetail.propTypes = {
  queryParams: PropTypes.object.isRequired
};

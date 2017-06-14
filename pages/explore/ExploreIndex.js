import React from 'react';
import PropTypes from 'prop-types';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';

import { EXPLORE_TABS } from 'constants/explore';

export default class ExploreIndex extends Page {
  render() {
    const { category, subCategory } = this.props.queryParams;
    // This is a temporary variable to show some content
    // eslint-disable-next-line
    const description = `Solution description lorem ipusm casius tesebe erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.`;

    return (
      <Layout
        title="Explore"
        queryParams={this.props.queryParams}
      >
        <Cover title="Explore" description={description} />
        <h1>Explore Index</h1>
        <strong>Category?: </strong> {category || '–'}<br />
        <strong>Sub-category?: </strong> {subCategory || '–'}

        <Tab
          allowAll
          className="-explore"
          items={EXPLORE_TABS}
          queryParams={this.props.queryParams}
        />
      </Layout>
    );
  }
}

ExploreIndex.propTypes = {
  queryParams: PropTypes.object,
  subCategory: PropTypes.string
};

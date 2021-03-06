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
import Initiative from 'components/about/Initiative';
import Solutions from 'components/about/Solutions';
import Events from 'components/about/Events';
import Blogs from 'components/about/Blogs';
import CitySupport from 'components/about/CitySupport';
import MoreInformation from 'components/about/MoreInformation';

// constants
import { GA_ABOUT } from 'constants/analytics';

const tabs = [
  {
    id: uuidv1(),
    label: 'About the Initiative',
    section: null,
    component: Initiative
  },
  {
    id: uuidv1(),
    label: 'Solutions',
    section: 'solutions',
    component: Solutions
  },
  {
    id: uuidv1(),
    label: 'Blogs',
    section: 'blogs',
    component: Blogs
  },
  {
    id: uuidv1(),
    label: 'More Information',
    section: 'more-information',
    component: MoreInformation
  }
];


class AboutPage extends Page {

  renderTabs() {
    return (<div className="c-tabs -explore">
      <div className="row">
        <div className="olumn small-12 medium-10 medium-offset-1">
          <ul className="tab-list">
            {tabs.map(tab => (
              <li
                key={tab.id}
                className={classnames('tab-item', { '-current': (this.props.queryParams.section || null) === tab.section })}
              >
                <Link route="about" params={{ section: tab.section }} >
                  <a className="literal">{tab.label}</a>
                </Link>
              </li>
           ))}
          </ul>
        </div>
      </div>
    </div>);
  }

  renderContent() {
    const currentTab = tabs.find(s => s.section === (this.props.queryParams.section || null));

    if (currentTab) return (<currentTab.component />);

    return (<p>not found</p>);
  }

  render() {
    return (
      <Layout
        title="About"
        queryParams={this.props.queryParams}
      >
        <div className="about-page">
          <Cover
            title="The Initiative"
            size="shorter"
            image="/static/images/about-header.jpeg"
          />

          {this.renderTabs()}
          {this.renderContent()}
        </div>
      </Layout>
    );
  }
}

AboutPage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

export default withRedux(store)(withTracker(AboutPage, GA_ABOUT));

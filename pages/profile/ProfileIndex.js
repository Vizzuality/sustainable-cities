import React from 'react';
// import classnames from 'classnames';
// import { Link } from 'routes';
import Page from 'pages/Page';

import Layout from 'components/layout/layout';
// import ProjectOverview from 'components/builder-index/ProjectOverview';
// import ProjectDetail from 'components/builder-index/ProjectDetail';
// import ProjectCategory from 'components/builder-index/ProjectCategory';
import Cover from 'components/common/Cover';
// import Button from 'components/common/Button';
// import Breadcrumbs from 'components/common/Breadcrumbs';

// import { leaves, flattenSolutionTree } from 'utils/builder';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
// import { Router } from 'routes'

// import { getBmes, getEnablings, getSolutions } from 'modules/builder-api';
// import { setField, commentBME } from 'modules/builder';


class ProfileIndex extends Page {
  constructor() {
    super();

    this.state = {
      modal: null,
      activeTab: 'overview'
    };
  }

  onFieldChange = (name, value) => this.props.setField(name, value);

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="c-builder-project"
      >
        <Cover
          size="shorter"
          title="My profile"
          image="/static/images/download-data-module.jpg"
        />

        <div className="row u-mt-2">
          <div className="column large-4">
            <h2 className="c-title -fw-light -fw-extrabig">Account details</h2>
          </div>
          <div className="column large-8">
            <h3 className="c-title -fw-light -fw-bigger">Email</h3>
            <input className="u-block input-text u-mt-1 u-w-100" type="text" value={this.props.profile.email} />

            <h3 className="c-title -fw-light -fw-bigger u-mt-2">Name</h3>
            <input className="u-block input-text u-mt-1 u-w-100" type="text" value={this.props.profile.name} />

            <h3 className="c-title -fw-light -fw-bigger u-mt-2">Nickname</h3>
            <input className="u-block input-text u-mt-1 u-w-100" type="text" value={this.props.profile.nickname} />
          </div>
        </div>

        <div className="row u-mt-4">
          <div className="column large-4">
            <h2 className="c-title -fw-light -fw-extrabig">Saved projects</h2>
          </div>
          <div className="column large-8">
             No saved projects yet!
          </div>
        </div>

      </Layout>
    );
  }
}

export default withRedux(
  store,
  state => state.auth,
  () => ({})
)(ProfileIndex);


import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import isEmpty from 'lodash/isEmpty';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getBmeDetail } from 'modules/bme';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';
import ProjectDetail from 'components/explore-detail/ProjectDetail';

class BmeDetail extends Page {

  componentWillMount() {
    const { id } = this.props.queryParams;

    this.props.getBmeDetail({ detailId: id });
  }

  renderProject(project) {
    return (<div className='project-content' key={project.id}>
      <div className='row'>
        <div className='column large-9 title huge'>
          {project.name}
        </div>
        <div className='column large-3 align-right'>
          <Button secondary link={`/projects/${project.id}`}>See Project</Button>
        </div>
      </div>
      <div className='row'>
        <div className='column large-12'>

        </div>
      </div>
      <div className='row'>
        <div className='column large-12 details'>
          {project.solution}
        </div>
      </div>
    </div>);
  }

  render() {
    const { detail } = this.props;

    console.log(detail);
    const enablingConditions = {
      successFactors: detail.enablings && detail.enablings.filter((e) => e.assessmentValue === 'Success'),
      knownBarriers: detail.enablings && detail.enablings.filter((e) => e.assessmentValue === 'Barrier'),
    };

    return (<Layout title='BME details' queryParams={this.props.queryParams}>
      {!isEmpty(detail) && (<div className='bme-detail'>
        <div className='bme-detail-header'>
          <div className='row'>
            <div className='column large-12 subtitle'>
              placeholder / placeholder / placeholder
            </div>
          </div>
          <div className='row'>
            <div className='column large-12 title huge'>
              {detail.name}
            </div>
          </div>
        </div>
        <div className='bme-detail-body'>
          <div className='row'>
            <div className='column large-4 title medium'>
              What it is & how does it work?
            </div>
            <div className='column large-8 content separator'>
              {detail.description}
            </div>
          </div>
          <div className='row'>
            <div className='column large-4 title medium'>
              Enabling conditions
            </div>
            <div className='column large-8 separator'>
              <div className='row'>
                <div className='column large-6 content'>
                  <div className='title medium'>
                    Success factors
                  </div>
                  <ul className='details'>
                    {enablingConditions.successFactors.length === 0 && (<li>
                      No success factors
                    </li>)}
                    {enablingConditions.successFactors.map((e) => (<li key={e.id}>
                      {e.name}
                    </li>))}
                  </ul>
                </div>
                <div className='column large-6'>
                   <div className='title medium'>
                     Known barriers
                   </div>
                   <div className='content'>
                     <ul className='details'>
                       {enablingConditions.knownBarriers.length === 0 && (<li>
                         No known barriers
                       </li>)}
                       {enablingConditions.knownBarriers.map((e) => (<li key={e.id}>
                         {e.name}
                       </li>))}
                     </ul>
                   </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='column large-4 title medium'>
              Projects that use it
            </div>
            <div className='column large-8 content separator'>
              {detail.projects.map((p) => this.renderProject(p))}
            </div>
          </div>
          <div className='row'>
            <div className='column large-4 title medium'>
              Where can I learn more?
            </div>
            <div className='column large-8 content separator'>
              <ul className='external-sources'>
                {detail.externalSources.map((s) => (<li key={s.id}>
                  {s.webUrl && (<a className='external' href={s.webUrl}>
                    {s.name}
                  </a>)}
                  {!s.webUrl && (<span>
                    {s.name}
                  </span>)}
                </li>))}
              </ul>
            </div>
          </div>
        </div>
        <div className='bme-detail-related-content'>
          <div className='row'>
            <div className='column large-12 title huge'>
              Related Content
            </div>
          </div>
        </div>
        <div className='bme-detail-download-data inverted'>
          <div className='row'>
            <div className='column large-12 title huge'>
              Download Data
            </div>
          </div>
        </div>
      </div>)}
    </Layout>);
  }

}

export default withRedux(
  store,
  state => ({
    detail: state.bme.detail
  }),
  dispatch => ({
    // bme
    getBmeDetail(filters) { dispatch(getBmeDetail(filters)) }
  })
)(BmeDetail);

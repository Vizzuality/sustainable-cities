import classnames from 'classnames';
import { Link } from 'routes';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import BuilderPage from 'pages/builder/BuilderPage';
import Layout from 'components/layout/layout';
import ProjectOverview from 'components/builder-index/ProjectOverview';
import ProjectDetail from 'components/builder-index/ProjectDetail';
import ProjectCategory from 'components/builder-index/ProjectCategory';
import ShareModal from 'components/common/ShareModal';
import ConnectedBmeDetail from 'components/builder-index/ConnectedBmeDetail';
import { DisclaimerModal } from 'components/common/disclaimer/DisclaimerModal';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';

import { builderSelector } from 'selectors/builder';

import { Router } from 'routes'

import { setField, commentBME, create, reset, update } from 'modules/builder';
import { withSlice } from 'utils/builder';


class Project extends React.Component {
  state = {
    modal: null,
    activeTab: 'overview',
  };

  showShareModal = () => this.setState({ modal: 'share' });

  hideModal = () => this.setState({ modal: null });

  showLogin = () => this.setState({ modal: 'login' });

  showSignUp = () => this.setState({ modal: 'sign-up' });

  download = () => Router.pushRoute('builder-project-print', this.props.bmRouteParams);

  onFieldChange = (name, value) => this.props.setField(name, value);

  changeBMEcomment = (bme, text) => this.props.commentBME(bme.id, text);

  showBMEModal = (bme, tab) => this.setState({ modal: 'bme', modalArgs: { bme, tab } });

  saveProject = () => {
    if (this.props.auth.token) {
      if (this.props.project.writableId) {
        this.props.update(this.props.project, this.props.auth.token);
      } else {
        create(
          this.props.project,
          this.props.auth.token,
        ).then(writableId => {
          this.props.reset();
          Router.pushRoute(document.location.origin + `/builder/w${writableId}/project`);
        });
      }
    } else {
      this.showLogin();
    }
  }

  projectUrl(readonly) {
    if (readonly && this.props.project.readableId) {
      return document.location.origin + "/builder/r" + this.props.project.readableId;
    }

    if (!readonly && this.props.project.writableId) {
      return document.location.origin + "/builder/w" + this.props.project.writableId;
    }

    return null;
  }

  render() {
    const defaultTabItems = [
      {
        slug: 'overview',
        label: 'Overview',
      },
      {
        slug: 'details',
        label: 'Project Details',
      },
    ];

    const tabItems = [
      defaultTabItems[0],
      ...this.props.filteredBmeTree.map((category) => ({
        slug: category.slug,
        label: category.name,
        className: 'info',
      })),
      defaultTabItems[1],
    ];

    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="c-builder-project"
      >
        <Cover
          position="bottom"
          size='shorter'
          title={this.props.project.title || "Project title"}
          image='/static/images/download-data-module.jpg'
          breadcrumbs={<Breadcrumbs items={[{
            name: '< Back to builder',
            route: 'builder',
            params: this.props.bmRouteParams,
          }]} />}
        >
          <Button secondary inverse onClick={this.showShareModal}>Share/Export</Button>
          {!this.props.project.readonly && <Button inverse onClick={this.saveProject}>Save project</Button>}
        </Cover>

        <div className="c-tabs -explore">
          <div className="row">
            <ul className="tab-list">
              {tabItems.map((tab, n) => (
                <li
                  key={n}
                  className={classnames("tab-item", { "-current": this.state.activeTab == tab.slug })}
                >
                  <a className="literal" onClick={() => this.setState({activeTab: tab.slug })}>{tab.label}</a>
                  {tab.className === "info" && (<div className="c-info-icon" onClick={() => this.setState({ disclaimer: tab.slug })}>
                    <svg className="icon"><use xlinkHref="#icon-info" /></svg>
                  </div>)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {this.state.activeTab == 'overview' &&
          <ProjectOverview
            project={{ id: 2, bmeTree: this.props.filteredBmeTree }}
          />}

        {this.state.activeTab == 'details' &&
          <ProjectDetail
            project={{ id: 2, bmeTree: this.props.filteredBmeTree, impacts: [], externalSources: [], projectBmes: [] }}
            categories={[]}
            fields={this.props.project}
            onFieldChange={this.onFieldChange}
            readonly={this.props.project.readonly}
          />}

        {(this.state.activeTab != 'overview' && this.state.activeTab != 'details') &&
          <ProjectCategory
            category={this.props.filteredBmeTree.find(cat => cat.slug == this.state.activeTab)}
            onCommentChange={this.changeBMEcomment}
            onBMEDisplay={this.showBMEModal}
            bmeDescription={bme => bme.comment}
            readonly={this.props.project.readonly}
          />
        }

        {
          this.state.modal == 'share' &&
            <ShareModal
              onClose={this.hideModal}
              onDownload={this.download}
              onSave={this.saveProject}
              url={this.projectUrl(true)}
              urlEditable={this.projectUrl(false)}
            />
        }

        {
          this.state.modal == 'bme' &&
            <ConnectedBmeDetail
              businessModelId={this.props.businessModelId}
              slice={this.props.slice}
              bmeId={this.state.modalArgs.bme.id}
              initialTab={this.state.modalArgs.tab}
              onClose={this.hideModal}
          />
        }

        {this.state.modal == 'login' && <Login
          onClose={this.hideModals}
          onSignUp={this.showSignUp}
          onLogin={this.hideModals}
        />}

        {this.state.modal == 'sign-up' && <SignUp
          onClose={this.hideModals}
          onLogin={this.showLogin}
          onSignUp={this.hideModals}
        />}

        <DisclaimerModal
          categories={this.props.filteredBmeTree}
          disclaimer={this.state.disclaimer}
          onClose={() => this.setState({ disclaimer: null })}
        />
    </Layout>
    );
  }
}

export default BuilderPage(
  connect(
    builderSelector,
    withSlice({
      commentBME,
      setField,
      update,
      reset,
    }),
  )(Project)
);

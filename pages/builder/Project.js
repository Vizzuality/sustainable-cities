import React from 'react';
import Proptypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Router } from 'routes';
import uuidv1 from 'uuid/v1';

// modules
import {
  deleteCustomBME,
  addCustomBME,
  setField,
  commentBME,
  create,
  reset,
  rememberProject,
  update
} from 'modules/builder';

// selectors
import { builderSelector } from 'selectors/builder';

// components
import BuilderPage from 'pages/builder/BuilderPage';
import Layout from 'components/layout/layout';
import ProjectOverview from 'components/builder-index/ProjectOverview';
import ProjectDetail from 'components/builder-index/ProjectDetail';
import ProjectCategory from 'components/builder-index/ProjectCategory';
import ShareModal from 'components/common/ShareModal';
import SaveModal from 'components/builder-index/SaveModal';
import SavedModal from 'components/builder-index/SavedModal';
import ConnectedBmeDetail from 'components/builder-index/ConnectedBmeDetail';
import Modal from 'components/common/Modal';
import DisclaimerModal from 'components/common/disclaimer/DisclaimerModal';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';
import Login from 'components/common/Login';
import SignUp from 'components/common/SignUp';

// utils
import { withSlice } from 'utils/builder';


class Project extends React.Component {
  state = {
    modal: {
      disclaimer: {
        open: false,
        category: null
      },
      login: {
        open: false
      },
      signup: {
        open: false
      },
      share: {
        open: false
      },
      save: {
        open: false
      },
      saved: {
        open: false
      },
      bme: {
        open: false,
        modalArgs: {
          bme: {},
          tab: null
        }
      }
    },
    activeTab: 'overview'
  };

  onFieldChange = (name, value) => this.props.setField(name, value);

  download = () => Router.pushRoute('builder-project-print', this.props.bmRouteParams);

  hideModal = (modal) => this.setState({
    modal: {
      ...this.state.modal,
      [modal]: { ...this.state.modal[modal], open: false },
    }
  });

  showModal = (modal) => this.setState({
    modal: {
      ...this.state.modal,
      [modal]: { ...this.state.modal[modal], open: true },
    }
  })

  showLogin = () => this.showModal('login');
  showSignUp = () => this.showModal('signup');
  showSave = () => this.showModal('save');
  showSaved = () => this.showModal('saved');
  showShare = () => this.showModal('share');

  showBMEModal = (bme, tab) => this.setState({
    modal: {
      ...this.state.modal,
      bme: {
        open: true,
        modalArgs: { bme, tab }
      }
    }
  });

  changeBMEcomment = (bme, text) => this.props.commentBME(bme.id, text);

  onSaveClick = () => {
    if (this.props.auth.token) {
      this.showSave();
    } else {
      this.showLogin();
    }
  }

  createNewProject = (title) => {
    this.hideModal('save');
    create({ ...this.props.project, title }, this.props.auth.token).then(writableId => {
      this.props.reset();
      this.props.rememberProject(writableId);

      this.showModal('saved');
      setTimeout(() => this.hideModal('saved'), 2000);
    });
  }

  updateProject = (title) => {
    this.hideModal('save');
    this.props.update({ ...this.props.project, title }, this.props.auth.token).then(() => {
      this.showModal('saved');
      setTimeout(() => this.hideModal('saved'), 2000);
    });
  }

  projectUrl(readonly) {
    if (readonly && this.props.project.readableId) {
      return `${document.location.origin}/builder/r${this.props.project.readableId}`;
    }

    if (!readonly && this.props.project.writableId) {
      return `${document.location.origin}/builder/w${this.props.project.writableId}`;
    }

    return null;
  }

  render() {
    const defaultTabItems = [
      {
        slug: 'overview',
        label: 'Overview'
      },
      {
        slug: 'details',
        label: 'Project Details'
      }
    ];

    const tabItems = [
      defaultTabItems[0],
      ...(this.props.filteredBmeTree || []).map(category => ({
        slug: category.slug,
        label: category.name,
        className: 'info'
      })),
      defaultTabItems[1]
    ];

    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="c-builder-project"
      >
        <Cover
          position="bottom"
          size="shorter"
          title={this.props.project.title || 'Project title'}
          image="/static/images/download-data-module.jpg"
          breadcrumbs={<Breadcrumbs
            items={[{
              name: '< Back to builder',
              route: 'builder',
              params: this.props.bmRouteParams
            }]}
          />}
        >
          <Button secondary inverse onClick={this.showShare}>Share/Export</Button>
          {!this.props.project.readonly &&
            <Button inverse onClick={this.onSaveClick}>Save project</Button>}
        </Cover>

        <div className="c-tabs -explore">
          <div className="row">
            <ul className="tab-list">
              {(tabItems || []).map(tab => (
                <li
                  key={uuidv1()}
                  className={classnames('tab-item', { '-current': this.state.activeTab === tab.slug })}
                >
                  <a className="literal" onClick={() => this.setState({ activeTab: tab.slug })}>{tab.label}</a>
                  {tab.className === 'info' &&
                    (<button
                      className="c-info-icon"
                      onClick={() => this.setState({ modal: {
                        ...this.state.modal,
                        disclaimer: {
                          open: true,
                          category: tab.slug
                        }
                      } })}
                    >
                      <svg className="icon -info"><use xlinkHref="#icon-info" /></svg>
                    </button>)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {this.state.activeTab === 'overview' &&
          <ProjectOverview
            project={{ id: 2, bmeTree: this.props.filteredBmeTree }}
          />}

        {this.state.activeTab === 'details' &&
          <ProjectDetail
            project={{
              id: 2,
              bmeTree: this.props.filteredBmeTree,
              impacts: [],
              externalSources: [],
              projectBmes: [] }}
            categories={[]}
            fields={this.props.project}
            onFieldChange={this.onFieldChange}
            readonly={this.props.project.readonly}
          />}

        {(this.props.filteredBmeTree.length > 0 && this.state.activeTab !== 'overview' && this.state.activeTab !== 'details') &&
          <ProjectCategory
            bmeTree={this.props.bmeTree}
            category={this.props.filteredBmeTree.find(cat => cat.slug === this.state.activeTab)}
            onCommentChange={this.changeBMEcomment}
            onBMEDisplay={this.showBMEModal}
            onAddCustomElement={this.props.addCustomBME}
            onDeleteCustomElement={this.props.deleteCustomBME}
            bmeDescription={bme => bme.comment}
            readonly={this.props.project.readonly}
          />
        }

        <Modal
          open={this.state.modal.share.open}
          toggleModal={v => this.setState({
            modal: {
              ...this.state.modal,
              share: { open: v }
            }
          })}
        >
          <ShareModal
            onClose={() => this.hideModal('share')}
            onDownload={this.download}
            onSave={this.saveProject}
            url={this.projectUrl(true)}
            urlEditable={this.projectUrl(false)}
          />
        </Modal>

        <Modal
          open={this.state.modal.bme.open}
          toggleModal={v => this.setState({
            modal: {
              ...this.state.modal,
              bme: { open: v, modalArgs: { bme: {} } }
            }
          })}
        >
          <ConnectedBmeDetail
            businessModelId={this.props.businessModelId}
            slice={this.props.slice}
            bmeId={this.state.modal.bme.modalArgs.bme.id}
            initialTab={this.state.modal.bme.modalArgs.tab}
            onClose={() => this.hideModal('bme')}
          />
        </Modal>

        <Modal
          open={this.state.modal.login.open}
          toggleModal={v => this.setState({
            modal: {
              ...this.state.modal,
              login: { open: v }
            }
          })}
        >
          <Login
            onClose={() => this.hideModal('login')}
            onSignUp={this.showSignUp}
            onLogin={this.hideModal}
          />
        </Modal>

        <Modal
          open={this.state.modal.signup.open}
          toggleModal={v => this.setState({
            modal: {
              ...this.state.modal,
              signup: { open: v }
            }
          })}
        >
          <SignUp
            onClose={() => this.hideModal('signup')}
            onLogin={this.showLogin}
            onSignUp={this.hideModal}
          />
        </Modal>

        <Modal
          open={this.state.modal.disclaimer.open}
          toggleModal={v => this.setState({
            modal: {
              ...this.state.modal,
              disclaimer: { open: v }
            }
          })}
          loading={this.props.filteredBmeTree.length === 0}
        >
          <DisclaimerModal
            categories={this.props.filteredBmeTree}
            disclaimer={this.state.modal.disclaimer.category}
            onClose={() => this.hideModal('disclaimer')}
          />
        </Modal>

        <Modal
          open={this.state.modal.save.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            save: { open: v }
          } })}
        >
          <SaveModal
            readonly={this.props.readonly}
            existing={this.props.businessModelId}
            currentProjectName={this.props.project.title}
            onClose={() => this.hideModal('save')}
            onUpdate={this.updateProject}
            onCreate={this.createNewProject}
          />
        </Modal>

        <Modal
          open={this.state.modal.saved.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            saved: { open: v }
          } })}
        >
          <SavedModal onClose={() => this.hideModal('saved')} />
        </Modal>
      </Layout>
    );
  }
}

Project.propTypes = {
  auth: Proptypes.object,
  addCustomBME: Proptypes.func,
  bmeTree: Proptypes.array,
  deleteCustomBME: Proptypes.func,
  filteredBmeTree: Proptypes.array,
  project: Proptypes.object,
  setField: Proptypes.func,
  bmRouteParams: Proptypes.object,
  commentBME: Proptypes.func,
  queryParams: Proptypes.object,
  update: Proptypes.func,
  reset: Proptypes.func
};

Project.defaultProps = {
  filteredBmeTree: []
};

export default BuilderPage(
  connect(
    builderSelector,
    withSlice({
      addCustomBME,
      commentBME,
      deleteCustomBME,
      setField,
      update,
      reset,
      rememberProject
    }),
  )(Project)
);

import React from 'react';
import Page from 'pages/Page';
import { Link } from 'routes';

import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import DeleteModelModal from 'components/profile/DeleteModelModal';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import { saveProfile, getSavedProjects, deleteSavedProject } from 'modules/auth';


class ProfileIndex extends Page {
  state = {
    errors: [],
    modal: {
      delete: {
        open: false,
        projectId: null
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token) {
      this.props.getSavedProjects(nextProps.token);
    }
  }

  onFieldChange = (name, value) => this.setState({ [name]: value });

  saveProfile = () => {
    this.setState({ errors: [] });
    this.props.saveProfile(
      this.props.token,
      {
        email: this.state.email,
        name: this.state.name,
        nickname: this.state.nickname,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      },
    ).then((data) => {
      if (data.errors) {
        this.setState({ errors: data.errors });
      }
    });
  };

  onDeleteSavedProject(project) {
    this.openDeleteModal(project);
  }

  openDeleteModal(project) {
    this.setState({
      ...this.state,
      modal: {
        ...this.state.modal,
        delete: {
          open: true,
          project
        }
      }
    });
  }

  render() {
    const { savedProjects } = this.props.profile;

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
        >
          <Button primary inverse onClick={this.saveProfile}>Save changes</Button>
        </Cover>

        <div className="row u-mt-2">
          <div className="column large-4">
            <h2 className="c-title -fw-light -fw-extrabig">Account details</h2>
          </div>
          <div className="column large-8">
            {this.state.errors.map((error, i) => <p key={i}>{error.title}</p>)}

            <h3 className="c-title -fw-light -fw-bigger">Email</h3>
            <input
              className="u-block input-text u-mt-1 u-w-100"
              type="text"
              onChange={e => this.onFieldChange('email', e.target.value)}
              value={this.state.email === undefined ? this.props.profile.email : this.state.email}
            />

            <h3 className="c-title -fw-light -fw-bigger u-mt-2">Name</h3>
            <input
              className="u-block input-text u-mt-1 u-w-100"
              type="text"
              onChange={e => this.onFieldChange('name', e.target.value)}
              value={this.state.name === undefined ? this.props.profile.name : this.state.name}
            />

            <h3 className="c-title -fw-light -fw-bigger u-mt-2">Nickname</h3>
            <input
              className="u-block input-text u-mt-1 u-w-100"
              type="text"
              onChange={e => this.onFieldChange('nickname', e.target.value)}
              value={this.state.nickname === undefined ?
                this.props.profile.nickname : this.state.nickname}
            />

            <h3 className="c-title -fw-light -fw-bigger u-mt-2">Change password</h3>
            <input
              className="u-block input-text u-mt-1 u-w-100"
              type="password"
              onChange={e => this.onFieldChange('password', e.target.value)}
              value={this.state.password}
            />
            <input
              className="u-block input-text u-mt-1 u-w-100"
              type="password"
              onChange={e => this.onFieldChange('passwordConfirmation', e.target.value)}
              value={this.state.passwordConfirmation}
            />
          </div>
        </div>

        <div className="row u-mt-4">
          <div className="column large-4">
            <h2 className="c-title -fw-light -fw-extrabig">Saved projects</h2>
          </div>
          <div className="column large-8">
            {(savedProjects || []).length > 0 ?
              <ul className="saved-project-list">
                {savedProjects.map(project =>
                  <li
                    key={project.id}
                    className="saved-project-item"
                  >
                    <Link
                      route="builder"
                      params={{
                        id: project.id
                      }}
                    >
                      <a className="c-title -dark">{project.title}</a>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() =>
                        this.onDeleteSavedProject(project)}
                    >
                      Delete
                    </button>
                  </li>)}
              </ul> :
              <span className="c-text -dark -fs-default">No saved projects yet!</span>}
          </div>
        </div>

        <Modal
          open={this.state.modal.delete.open}
          toggleModal={v => this.setState({
            modal: { ...this.state.modal, delete: { open: v } }
          })}
        >
          <DeleteModelModal
            project={this.state.modal.delete.project}
            token={this.props.token || ''}
            onDelete={this.props.deleteSavedProject}
            onClose={() => this.setState({
              modal: { ...this.state.modal, delete: { open: false } }
            })}
          />
        </Modal>
      </Layout>
    );
  }
}

export default withRedux(
  store,
  state => state.auth,
  {
    saveProfile,
    getSavedProjects,
    deleteSavedProject
  }
)(ProfileIndex);


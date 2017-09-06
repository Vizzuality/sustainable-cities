import classnames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import storage from 'local-storage-fallback';

import BuilderPage from 'pages/builder/BuilderPage';
import { Router } from 'routes';

import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import SolutionPicker from 'components/builder-index/SolutionPicker';
import EnablingConditionsSelector from 'components/builder-index/EnablingConditionsSelector';
import RadialChart from 'components/common/RadialChart';
import ConnectedBmeDetail from 'components/builder-index/ConnectedBmeDetail';
import Login from 'components/common/Login';
import SignUp from 'components/common/SignUp';
import Spinner from 'components/common/Spinner';
import Modal from 'components/common/Modal';
import HelpModal from 'components/builder-index/HelpModal';
import SaveModal from 'components/builder-index/SaveModal';

import { builderSelector, withModifiers } from 'selectors/builder';
import { withSlice, leaves } from 'utils/builder';

import {
  deselectEnabling,
  selectEnabling,
  selectSolution,
  reset,
  create,
  update,
  rememberProject
} from 'modules/builder';

const modals = {
  login: { open: false },
  signup: { open: false },
  bmeDetail: { open: false },
  save: { open: false },
  help: { open: false },
};

class BuilderIndex extends React.Component {
  state = {
    sidebar: "default",
    hoveredEnabling: null,
    bme: {},
    modal: {
      ...modals,
      help: {
        open: process.browser && !storage.getItem('builder.help-dismissed')
      }
    }
  };

  selectSolution(solution) {
    this.props.selectSolution(solution.id);
  }

  selectEnabling(enabling) {
    this.props.selectEnabling(enabling.id);
  }

  deselectEnabling(enabling) {
    this.props.deselectEnabling(enabling.id);
  }

  relativeBME(bme, delta) {
    const bmes = leaves(this.props.solutionFilteredBmeTree);
    const bmeIndex = bmes.findIndex(b => b.id === bme.id);

    return bmes.concat(bmes)[(bmeIndex + bmes.length + delta) % bmes.length];
  }

  selectNext(bme) {
    this.showBME(this.relativeBME(bme, 1));
  }

  selectPrevious(bme) {
    this.showBME(this.relativeBME(bme, -1));
  }

  showBME = bme => this.setState({
    bme,
    modal: {
      ...this.state.modal,
      bmeDetail: { open: true }
    }
  });

  hideBME = () => this.setState({
    bme: {},
    modal: {
      ...this.state.modal,
      bmeDetail: { open: false }
    }
  });

  hideHelp = () => {
    this.setState({ modal: {
      ...this.state.modal,
      help: { open: false } }
    });

    storage.setItem('builder.help-dismissed', true);
  }

  showSolutionPicker = () => this.setState({ sidebar: "solutions" });

  showEnablingsSelector = () => this.setState({ sidebar: "enablings" });

  showResults = () => Router.pushRoute('builder-project', this.props.bmRouteParams);

  showSidebar = () => this.setState({ sidebar: "default" });

  showEnablingBMEs = (enabling) => this.setState({ hoveredEnabling: enabling.id });

  hideModals = () => this.setState({ modal: modals });

  showLogin = () => this.setState({ modal: { ...this.state.modal, login: { open: true } } });

  showSignUp = () => this.setState({ modal: { ...this.state.modal, signup: { open: true } } });

  showSave = () => this.setState({ modal: { ...this.state.modal, save: { open: true } } });

  showHelp = () => this.setState({ modal: { ...this.state.modal, help: { open: true } } });

  onSaveClick = () => {
    if (this.props.auth.token) {
      this.showSave();
    } else {
      this.showLogin();
    }
  }

  reset = () => {
    this.props.reset();
    Router.pushRoute('builder');
  }

  createNewProject = (title) => {
    this.hideModals();
    create({ ...this.props.project, title }, this.props.auth.token).then(writableId => {
      this.props.reset();
      this.props.rememberProject(writableId);
    });
  }

  updateProject = (title) => {
    this.hideModals();
    this.props.update({ ...this.props.project, title }, this.props.auth.token);
  }

  nodesToShow() {
    if (this.props.readonly) {
      return this.props.filteredBmeTree;
    } else {
      if (this.state.sidebar == "enablings") {
        return withModifiers(this.props.solutionFilteredBmeTree, [this.state.hoveredEnabling]);
      } else {
        return this.props.bmeTree;
      }
    }
  }

  render() {
    const loading = this.props.bmeTree.length == 0;

    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="builder-index"
      >
        <Sidebar
          readonly={this.props.project.readonly}
          onHelpClick={this.showHelp}
          onSolutionsClick={this.showSolutionPicker}
          onEnablingsClick={this.showEnablingsSelector}
          onShowResultsClick={this.showResults}
          onSaveClick={this.onSaveClick}
          onResetClick={this.reset}
          selectedSolution={this.props.selectedSolution}
          selectedEnablings={this.props.selectedEnablings}
        />

        { this.state.sidebar === 'solutions' &&
          <SolutionPicker
            onSolutionSelected={(s) => this.selectSolution(s)}
            onClose={this.showSidebar}
            solutions={this.props.solutions}
            selectedSolution={this.props.selectedSolution}
          />
        }

        { this.state.sidebar === 'enablings' &&
          <EnablingConditionsSelector
            nodes={this.props.enablings}
            selectedEnablings={this.props.selectedEnablings}
            onClose={this.showSidebar}
            onEnablingSelect={(enabling) => this.selectEnabling(enabling)}
            onEnablingDeselect={(enabling) => this.deselectEnabling(enabling)}
            onEnablingHover={(enabling) => this.showEnablingBMEs(enabling)}
          />
        }

        <div className={classnames(
          "u-mt-2",
          "u-ml-a",
          this.state.sidebar == "enablings" ? "u-w-30" : "u-w-100",
        )}>

          {loading ?
            <div className="row u-flex-center u-relative u-pb-100">
              <Spinner className="-transparent" isLoading={true} />
            </div> :
          <RadialChart
            nodes={this.nodesToShow()}
            selected={this.props.selectedBMEs}
            onClick={this.showBME}
            keyPrefix={(this.props.selectedSolution || { slug: "none"}).slug}
            interactive={this.state.sidebar == "default"}
            thumbnail={this.state.sidebar == "enablings"}
          />
          }

          { this.state.hoveredEnabling &&
              <div className="u-ml-1">
                <h1 className="c-title -fw-light -fs-bigger">Success factor for</h1>

                <ul>
                  {
                    (this.props.bmes || [])
                      .filter(bme => bme.enablings.find(enabling => enabling && enabling.id == this.state.hoveredEnabling))
                      .map(bme => <li className="c-text -fs-smaller -uppercase">{bme.name}</li>)
                  }
              </ul>
            </div>
          }
        </div>

        <Modal
          open={this.state.modal.bmeDetail.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            bmeDetail: { open: v }
          } })}
        >
          <ConnectedBmeDetail
            businessModelId={this.props.businessModelId}
            slice={this.props.slice}
            bmeId={this.state.bme.id}
            onClose={() => this.hideBME()}
            onNext={() => this.selectNext(this.state.bme)}
            onPrev={() => this.selectPrevious(this.state.bme)}
          />
        </Modal>

        <Modal
          open={this.state.modal.help.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            help: { open: v }
          } })}
        >
          <HelpModal onClose={this.hideHelp} />
        </Modal>

        <Modal
          open={this.state.modal.login.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            login: { open: v }
          } })}
        >
          <Login
            onClose={this.hideModals}
            onSignUp={this.showSignUp}
            onLogin={this.hideModals}
          />
        </Modal>

        <Modal
          open={this.state.modal.signup.open}
          toggleModal={v => this.setState({ modal: {
            ...this.state.modal,
            signup: { open: v }
          } })}
        >
          <SignUp
            onClose={this.hideModals}
            onLogin={this.showLogin}
            onSignUp={this.hideModals}
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
            onClose={this.hideModals}
            onUpdate={this.updateProject}
            onCreate={this.createNewProject}
          />
        </Modal>
      </Layout>
    );
  }
}

export default BuilderPage(
  connect(
    builderSelector,
    withSlice({
      deselectEnabling,
      selectEnabling,
      selectSolution,
      rememberProject,
      reset,
      update
    }),
  )(BuilderIndex)
);

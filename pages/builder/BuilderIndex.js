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
import SavedModal from 'components/builder-index/SavedModal';

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
  saved: { open: false },
  help: { open: false },
};

const tutorialSteps = [
  "start",
  "solution",
  "enabling-condition",
  "bme",
  "finish",
];

class BuilderIndex extends React.Component {
  state = {
    tutorialStep: storage.getItem('builder.tutorial-finished') ? "finish" : "start",
    sidebar: "default",
    hoveredEnabling: null,
    bme: {},
    modal: {
      ...modals,
      help: {
        open: process.browser && !storage.getItem('builder.tutorial-finished')
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
    this.hideModal('help');
    this.advanceTutorial();
  }

  showSolutionPicker = () => this.setSidebar("solutions");
  showEnablingsSelector = () => this.setSidebar("enablings");
  showSidebar = () => this.setSidebar("default");

  setSidebar = (sidebar) => {
    this.setState({ sidebar, family: null });
  }

  showResults = () => Router.pushRoute('builder-project', this.props.bmRouteParams);


  closeSolutionPicker = () => {
    this.showSidebar();

    if (this.state.tutorialStep == "solution") {
      this.advanceTutorial();
    }
  }

  closeEnablingConditionsSelector = () => {
    this.showSidebar();

    if (this.state.tutorialStep == "enabling-condition") {
      this.advanceTutorial();
    }
  }

  showEnablingBMEs = (enabling) => this.setState({ hoveredEnabling: enabling.id });

  hideModals = () => this.setState({ modal: modals });

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
  showHelp = () => this.showModal('help');

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

  advanceTutorial = () => {
    const nextStep = tutorialSteps[tutorialSteps.indexOf(this.state.tutorialStep) + 1];
    this.setState({ tutorialStep: nextStep });

    if (nextStep === "finish") {
      storage.setItem('builder.tutorial-finished', true);
    }
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

  currentTutorialStep() {
    if (this.state.sidebar !== "default") {
      return "hidden";
    }

    if (this.props.readonly || this.props.businessModelId) {
      return "hidden";
    }

    return this.state.tutorialStep;
  }

  render() {
    const loading = this.props.bmeTree.length == 0;

    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className={`builder-index tutorial-step--${this.currentTutorialStep()}`}
      >
        <Sidebar
          tutorialStep={this.state.tutorialStep}
          readonly={this.props.project.readonly}
          onHelpClick={this.showHelp}
          onSolutionsClick={this.showSolutionPicker}
          onEnablingsClick={this.showEnablingsSelector}
          onShowResultsClick={this.showResults}
          onSaveClick={this.onSaveClick}
          onResetClick={this.reset}
          selectedSolution={this.props.selectedSolution}
          selectedEnablings={this.props.selectedEnablings}
          onTutorialSkip={this.advanceTutorial}
        />

        { this.state.sidebar === 'solutions' &&
          <SolutionPicker
            onSolutionSelected={(s) => this.selectSolution(s)}
            onClose={this.closeSolutionPicker}
            solutions={this.props.solutions}
            selectedSolution={this.props.selectedSolution}
          />
        }

        { this.state.sidebar === 'enablings' &&
          <EnablingConditionsSelector
            nodes={this.props.enablings}
            selectedEnablings={this.props.selectedEnablings}
            onClose={this.closeEnablingConditionsSelector}
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
            family={this.state.sidebar === "default" ? this.state.family : null}
            nodes={this.nodesToShow()}
            selected={this.props.selectedBMEs}
            onClick={this.showBME}
            keyPrefix={(this.props.selectedSolution || { slug: "none"}).slug}
            interactive={this.state.sidebar == "default"}
            thumbnail={this.state.sidebar == "enablings"}
            onFamilyChange={(family) => this.setState({ family })}
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

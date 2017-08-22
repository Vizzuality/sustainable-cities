import classnames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import storage from 'local-storage-fallback';
import withRedux from 'next-redux-wrapper';

import BuilderPage from 'pages/builder/BuilderPage';
import { Router } from 'routes';
import { store } from 'store';

import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import SolutionPicker from 'components/builder-index/SolutionPicker';
import EnablingConditionsSelector from 'components/builder-index/EnablingConditionsSelector';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';
import ConnectedBmeDetail from 'components/builder-index/ConnectedBmeDetail';
import HelpModal from 'components/builder-index/HelpModal';
import Login from 'components/common/Login';
import SignUp from 'components/common/SignUp';

import { builderSelector, withModifiers } from 'selectors/builder';
import { leaves, withSlice } from 'utils/builder';

import {
  deselectEnabling,
  selectEnabling,
  selectSolution,
  reset,
  create,
  update,
} from 'modules/builder';


class BuilderIndex extends React.Component {
  state = {
    sidebar: "default",
    showHelp: process.browser && !storage.getItem('builder.help-dismissed'),
    hoveredEnabling: null,
    modal: null,
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
    const bmes = this.props.bmes;
    const bmeIndex = bmes.findIndex(b => b.id === bme.id);

    return bmes.concat(bmes)[(bmeIndex + bmes.length + delta) % bmes.length];
  }

  selectNext(bme) {
    this.showBME(this.relativeBME(bme, 1));
  }

  selectPrevious(bme) {
    this.showBME(this.relativeBME(bme, -1));
  }

  showBME = (bme) => this.setState({ bme });

  hideBME = () => this.setState({ bme: undefined });

  showHelp = () => this.setState({ showHelp: true });

  hideHelp = () => {
    this.setState({ showHelp: false });

    storage.setItem('builder.help-dismissed', true);
  }

  showSolutionPicker = () => this.setState({ sidebar: "solutions" });

  showEnablingsSelector = () => this.setState({ sidebar: "enablings" });

  showResults = () => Router.pushRoute('builder-project', this.props.bmRouteParams);

  showSidebar = () => this.setState({ sidebar: "default" });

  showEnablingBMEs = (enabling) => this.setState({ hoveredEnabling: enabling.id });

  hideModals = () => this.setState({ modal: null });

  showLogin = () => this.setState({ modal: 'login' });

  showSignUp = () => this.setState({ modal: 'sign-up' });

  save = () => {
    if (this.props.auth.token) {
      if (this.props.project.writableId) {
        this.props.update(this.props.project, this.props.auth.token);
      } else {
        create(
          this.props.project,
          this.props.auth.token,
        ).then(writableId => {
          this.props.reset();
          Router.pushRoute(document.location.origin + "/builder/w" + writableId);
        });
      }
    } else {
      this.showLogin();
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

  render() {
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
          onSaveClick={this.save}
          onResetClick={this.props.reset}
          selectedSolution={this.props.selectedSolution}
          selectedEnablings={this.props.selectedEnablings}
        />

        { this.state.sidebar == "solutions" &&
            <SolutionPicker
              onSolutionSelected={(s) => this.selectSolution(s)}
              onClose={this.showSidebar}
              solutions={this.props.solutions}
              selectedSolution={this.props.selectedSolution}
            />
        }

        { this.state.sidebar == "enablings" &&
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

          <RadialChart
            nodes={this.nodesToShow()}
            selected={this.props.selectedBMEs}
            onClick={this.showBME}
            keyPrefix={(this.props.selectedSolution || { slug: "none"}).slug}
            interactive={this.state.sidebar == "default"}
            thumbnail={this.state.sidebar == "enablings"}
          />

          { this.state.hoveredEnabling &&
              <div className="u-ml-1">
                <h1 className="c-title -fw-light -fs-bigger">Success factor for</h1>

                <ul>
                  {
                    this.props.bmes.
                      filter(bme => bme.enablings.find(enabling => enabling && enabling.id == this.state.hoveredEnabling)).
                      map(bme => <li className="c-text -fs-smaller -uppercase">{bme.name}</li>)
                  }
              </ul>
            </div>
          }
        </div>

        {this.state.bme && <ConnectedBmeDetail
          businessModelId={this.props.businessModelId}
          slice={this.props.slice}
          bmeId={this.state.bme.id}
          onClose={this.hideBME}
          onNext={() => this.selectNext(this.state.bme)}
          onPrev={() => this.selectPrevious(this.state.bme)}
        />}

        {this.state.showHelp && <HelpModal onClose={this.hideHelp} />}

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
      reset,
      update,
    }),
  )(BuilderIndex)
);

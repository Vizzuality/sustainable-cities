import Page from 'pages/Page';
import flatMap from 'lodash/flatMap';
import intersection from 'lodash/intersection';
import storage from 'local-storage-fallback';

import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import SolutionPicker from 'components/builder-index/SolutionPicker';
import EnablingConditionsSelector from 'components/builder-index/EnablingConditionsSelector';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';
import HelpModal from 'components/builder-index/HelpModal';

import { leaves, flattenSolutionTree } from 'utils/builder';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import {
  commentBME,
  deselectBME,
  deselectEnabling,
  getBmes,
  getSolutions,
  getEnablings,
  selectBME,
  selectEnabling,
  selectSolution,
} from 'modules/builder';

const transformBMEtree = (nodes, selectedSolution, selectedEnablings) => {
  const inSolution = (bme) => !selectedSolution || selectedSolution.bmes.map(b => b.id).includes(bme.id);


  return nodes.map(
    node => ({
      ...node,
      children: (
        node.children ?
        transformBMEtree(node.children, selectedSolution, selectedEnablings) :
        node.bmes.filter(inSolution).map(
          node => ({
            ...node,
            modifiers: node.enablings.filter(enabling => selectedEnablings.includes(enabling.id)).map(enabling => enabling['assessment-value']),
          })
        )
      ),
    })
  ).filter(
    node => node.children.length > 0
  ).map(
    node => ({
      ...node,
      modifiers: node.modifiers || node.children.map(n => n.modifiers).reduce((a,b) => a.filter(m => b.includes(m)))
    })
  );
};

class BuilderIndex extends Page {
  constructor() {
    super();

    this.state = {
      sidebar: "default",
      showHelp: process.browser && !storage.getItem('builder.help-dismissed'),
    };
  }

  componentWillMount() {
    this.props.getBMEs();
    this.props.getSolutions();
    this.props.getEnablingTree();
  }

  showBME(bme) {
    this.setState({ bme });
  }

  hideBME() {
    this.setState({ bme: undefined });
  }

  selectBME(bme) {
    this.props.selectBME(bme.id);
  }

  deselectBME(bme) {
    this.props.deselectBME(bme.id);
  }

  changeBMEcomment(bme, text) {
    this.props.commentBME(bme.id, text);
  }

  selectSolution(solution) {
    this.props.selectSolution(solution.id);
  }

  selectEnabling(enabling) {
    this.props.selectEnabling(enabling.id);
  }

  deselectEnabling(enabling) {
    this.props.deselectEnabling(enabling.id);
  }

  selectNext(bme) {
    const bmes = leaves(this.props.categories);

    this.showBME((bmes.concat(bmes))[bmes.findIndex(b => b.id == bme.id) + 1]);
  }

  selectPrevious(bme) {
    const bmes = leaves(this.props.categories);

    this.showBME((bmes.concat(bmes))[bmes.findIndex(b => b.id == bme.id) + bmes.length - 1]);
  }

  showHelp() {
    this.setState({ showHelp: true });
  }

  hideHelp() {
    this.setState({ showHelp: false });

    storage.setItem('builder.help-dismissed', true);
  }

  showSolutionPicker() {
    this.setState({ sidebar: "solutions" });
  }

  showEnablingsSelector() {
    this.setState({ sidebar: "enablings" });
  }

  showSidebar() {
    this.setState({ sidebar: "default" });
  }

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="builder-index"
      >
        { this.state.sidebar == "default" &&
        <Sidebar
          onHelpClick={() => this.showHelp()}
          onSolutionsClick={() => this.showSolutionPicker()}
          onEnablingsClick={() => this.showEnablingsSelector()}
          selectedSolution={this.props.selectedSolution}
          selectedEnablings={this.props.selectedEnablings}
        />
        }

        { this.state.sidebar == "solutions" &&
        <SolutionPicker
          onSolutionSelected={(s) => this.selectSolution(s)}
          onClose={() => this.showSidebar()}
          solutions={this.props.solutions}
          selectedSolution={this.props.selectedSolution}
        />
        }

        { this.state.sidebar == "enablings" &&
        <EnablingConditionsSelector
          nodes={this.props.enablings}
          selectedEnablings={this.props.selectedEnablings}
          onClose={() => this.showSidebar()}
          onEnablingSelect={(enabling) => this.selectEnabling(enabling)}
          onEnablingDeselect={(enabling) => this.deselectEnabling(enabling)}
        />
        }

        <RadialChart
          nodes={this.props.categories}
          selected={this.props.selectedBMEs}
          onClick={(bme) => this.showBME(bme)}
          keyPrefix={(this.props.selectedSolution || { name: "none"}).name}
          interactive={this.state.sidebar == "default"}
          thumbnail={this.state.sidebar == "enablings"}
        />

        {this.state.bme && <BmeDetail
          bme={this.state.bme}
          comment={this.props.commentedBMEs[this.state.bme.id]}
          selected={this.props.selectedBMEs.includes(this.state.bme.id)}
          selectedEnablings={this.props.selectedEnablings}
          onClose={() => this.hideBME()}
          onSave={() => this.selectBME(this.state.bme)}
          onCommentChange={(text) => this.changeBMEcomment(this.state.bme, text)}
          onDelete={() => this.deselectBME(this.state.bme)}
          onNext={() => this.selectNext(this.state.bme)}
          onPrev={() => this.selectPrevious(this.state.bme)}
          onEnablingSelect={(enabling) => this.selectEnabling(enabling)}
          onEnablingDeselect={(enabling) => this.deselectEnabling(enabling)}
        />}

        {this.state.showHelp && <HelpModal onClose={() => this.hideHelp()} />}
      </Layout>
    );
  }
}

export default withRedux(
  store,
  state => {
    const solutions = flattenSolutionTree(state.builder.solutionCategories) || [];
    const selectedSolution = solutions.find(solution => solution.id == state.builder.selectedSolution);
    const selectedBMEs = selectedSolution ? intersection(state.builder.selectedBMEs, selectedSolution.bmes.map(bme => bme.id)) : state.builder.selectedBMEs;

    return ({
      categories: transformBMEtree(state.builder.bmeCategories, selectedSolution, state.builder.selectedEnablings),
      commentedBMEs: state.builder.commentedBMEs,
      enablings: state.builder.enablingCategories,
      selectedBMEs,
      selectedEnablings: state.builder.selectedEnablings,
      selectedSolution,
      solutions,
    });
  },
  dispatch => ({
    getBMEs() { dispatch(getBmes()); },
    getEnablingTree() { dispatch(getEnablings()); },
    deselectBME(bmeId) { dispatch(deselectBME(bmeId)); },
    deselectEnabling(enablingId) { dispatch(deselectEnabling(enablingId)); },
    getSolutions() { dispatch(getSolutions()); },
    selectBME(bmeId) { dispatch(selectBME(bmeId)); },
    selectEnabling(enablingId) { dispatch(selectEnabling(enablingId)); },
    commentBME(bmeId, comment) { dispatch(commentBME(bmeId, comment)); },
    selectSolution(solutionId) { dispatch(selectSolution(solutionId)); },
  })
)(BuilderIndex);

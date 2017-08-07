import Page from 'pages/Page';
import flatMap from 'lodash/flatMap';
import intersection from 'lodash/intersection';
import storage from 'local-storage-fallback';

import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import SolutionPicker from 'components/builder-index/SolutionPicker';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';
import HelpModal from 'components/builder-index/HelpModal';

import { leaves, flattenSolutionTree } from 'utils/builder';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import {
  commentBME,
  deselectBME,
  getBmes,
  getSolutions,
  selectBME,
  selectSolution,
} from 'modules/builder';

const filterBMEtree = (bmeTree, selectedSolution) => {
  if (!selectedSolution) {
    return bmeTree;
  }

  return bmeTree.map(
    bmeCategory => ({
      ...bmeCategory,
      children: bmeCategory.children ? filterBMEtree(bmeCategory.children, selectedSolution) : null,
      bmes: (bmeCategory.bmes || []).filter(bme => selectedSolution.bmes.map(b => b.id).includes(bme.id)),
    })
  ).filter(
    bmeCategory => (bmeCategory.children || bmeCategory.bmes).length > 0
  );
};

class BuilderIndex extends Page {
  constructor() {
    super();

    this.state = {
      showHelp: process.browser && !storage.getItem('builder.help-dismissed'),
    };
  }

  componentWillMount() {
    this.props.getBMEs();
    this.props.getSolutions();
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
    this.setState({ showSolutionPicker: true })
  }

  hideSolutionPicker() {
    this.setState({ showSolutionPicker: false })
  }

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="builder-index"
      >
        { !this.state.showSolutionPicker &&
        <Sidebar
          onHelpClick={() => this.showHelp()}
          onSolutionsClick={() => this.showSolutionPicker()}
          selectedSolution={this.props.selectedSolution}
        />
        }

        { this.state.showSolutionPicker &&
        <SolutionPicker
          onSolutionSelected={(s) => this.selectSolution(s)}
          onClose={() => this.hideSolutionPicker()}
          solutions={this.props.solutions}
          selectedSolution={this.props.selectedSolution}
        />
        }

        <RadialChart
          nodes={this.props.categories}
          selected={this.props.selectedBMEs}
          onClick={(bme) => this.showBME(bme)}
          keyPrefix={(this.props.selectedSolution || { name: "none"}).name}
          interactive={true}
        />

        {this.state.bme && <BmeDetail
          bme={this.state.bme}
          comment={this.props.commentedBMEs[this.state.bme.id]}
          selected={this.props.selectedBMEs.includes(this.state.bme.id)}
          onClose={() => this.hideBME()}
          onSave={() => this.selectBME(this.state.bme)}
          onCommentChange={(text) => this.changeBMEcomment(this.state.bme, text)}
          onDelete={() => this.deselectBME(this.state.bme)}
          onNext={() => this.selectNext(this.state.bme)}
          onPrev={() => this.selectPrevious(this.state.bme)}
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
      categories: filterBMEtree(state.builder.bmeCategories, selectedSolution),
      commentedBMEs: state.builder.commentedBMEs,
      selectedBMEs,
      selectedSolution,
      solutions,
    });
  },
  dispatch => ({
    getBMEs() { dispatch(getBmes()); },
    getSolutions() { dispatch(getSolutions()); },
    selectBME(bmeId) { dispatch(selectBME(bmeId)); },
    deselectBME(bmeId) { dispatch(deselectBME(bmeId)); },
    commentBME(bmeId, comment) { dispatch(commentBME(bmeId, comment)); },
    selectSolution(solutionId) { dispatch(selectSolution(solutionId)); },
  })
)(BuilderIndex);

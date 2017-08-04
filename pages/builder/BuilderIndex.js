import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';
import HelpModal from 'components/builder-index/HelpModal';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import { getBmes, selectBME, deselectBME, commentBME } from 'modules/builder';

const leaves = (nodes) => {
  const children = nodes.map(t => t.children || t.bmes || []).reduce((a,b) => a.concat(b), []);

  if (children.length > 0) {
    return leaves(children);
  } else {
    return nodes;
  }
};

class BuilderIndex extends Page {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.getCategoryTree();
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
  }

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="builder-index"
      >
        <Sidebar onHelpClick={() => this.showHelp()} />

        <RadialChart
          nodes={this.props.categories}
          selected={this.props.selectedBMEs}
          onClick={(bme) => this.showBME(bme)}
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
  state => ({
    categories: state.builder.bmeCategories,
    selectedBMEs: state.builder.selectedBMEs,
    commentedBMEs: state.builder.commentedBMEs,
  }),
  dispatch => ({
    getCategoryTree() { dispatch(getBmes()); },
    selectBME(bmeId) { dispatch(selectBME(bmeId)); },
    deselectBME(bmeId) { dispatch(deselectBME(bmeId)); },
    commentBME(bmeId, comment) { dispatch(commentBME(bmeId, comment)); },
  })
)(BuilderIndex);

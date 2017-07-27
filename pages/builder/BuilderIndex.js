import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import { getBmes } from 'modules/bme';
import { selectBME, deselectBME } from 'modules/builder';

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

  selectNext(bme) {
    const bmes = leaves(this.props.categories);

    this.showBME((bmes.concat(bmes))[bmes.findIndex(b => b.id == bme.id) + 1]);
  }

  selectPrevious(bme) {
    const bmes = leaves(this.props.categories);

    this.showBME((bmes.concat(bmes))[bmes.findIndex(b => b.id == bme.id) + bmes.length - 1]);
  }

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="builder-index"
      >
        <Sidebar />

        <RadialChart
          nodes={this.props.categories}
          selected={this.props.selectedBMEs}
          onClick={(bme) => this.showBME(bme)}
        />

        {this.state.bme && <BmeDetail
          bme={this.state.bme}
          selected={this.props.selectedBMEs.includes(this.state.bme.id)}
          onClose={() => this.hideBME()}
          onSave={() => this.selectBME(this.state.bme)}
          onDelete={() => this.deselectBME(this.state.bme)}
          onNext={() => this.selectNext(this.state.bme)}
          onPrev={() => this.selectPrevious(this.state.bme)}
        />}
      </Layout>
    );
  }
}

export default withRedux(
  store,
  state => ({
    categories: state.bme.list.filter(c => c["category-type"] == "Bme"),
    selectedBMEs: state.builder.selectedBMEs,
  }),
  dispatch => ({
    getCategoryTree() { dispatch(getBmes()); },
    selectBME(bmeId) { dispatch(selectBME(bmeId)); },
    deselectBME(bmeId) { dispatch(deselectBME(bmeId)); },
  })
)(BuilderIndex);

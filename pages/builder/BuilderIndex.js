import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import { getBmes } from 'modules/bme';

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

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="builder-index"
      >
        <Sidebar />

        <RadialChart nodes={this.props.categories.filter(c => c["category-type"] == "Bme")} onClick={(bme) => this.showBME(bme)} />

      {this.state.bme && <BmeDetail bme={this.state.bme} onClose={() => this.hideBME()} />}
      </Layout>
    );
  }
}

export default withRedux(
  store,
  state => ({
    categories: state.bme.list,
  }),
  dispatch => ({
    getCategoryTree() { dispatch(getBmes()); },
  })
)(BuilderIndex);

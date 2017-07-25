import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Sidebar from 'components/builder-index/Sidebar';
import RadialChart from 'components/common/RadialChart';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import { getBmes } from 'modules/bme';

class BuilderIndex extends Page {
  componentWillMount() {
    this.props.getCategoryTree();
  }

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="builder-index"
      >
        <Sidebar />

        <RadialChart nodes={this.props.categories.filter(c => c["category-type"] == "Bme")} />
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

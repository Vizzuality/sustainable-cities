import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import EnablingConditionsSelector from 'components/builder-index/EnablingConditionsSelector';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import { Router } from 'routes'

import { getBmes, getEnablings } from 'modules/builder';

class EnablingConditions extends Page {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.getCategoryTree();
    this.props.getEnablingTree();
  }

  back() {
    Router.pushRoute('builder');
  }

  render() {
    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="enabling-conditions"
      >
        <EnablingConditionsSelector
          nodes={this.props.enablings}
          onClose={() => this.back()}
        />

        <RadialChart
          nodes={this.props.categories}
          interactive={false}
        />
      </Layout>
    );
  }
}

export default withRedux(
  store,
  state => ({
    categories: state.builder.bmeCategories,
    enablings: state.builder.enablingCategories || [],
    selectedBMEs: state.builder.selectedBMEs,
  }),
  dispatch => ({
    getCategoryTree() { dispatch(getBmes()); },
    getEnablingTree() { dispatch(getEnablings()); },
  })
)(EnablingConditions);


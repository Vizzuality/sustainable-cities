import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import EnablingConditionsSelector from 'components/builder-index/EnablingConditionsSelector';
import RadialChart from 'components/common/RadialChart';
import BmeDetail from 'components/builder-index/BmeDetail';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import { Router } from 'routes'

import { getBmes, getEnablings, deselectEnabling, selectEnabling } from 'modules/builder';

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

  selectEnabling(enabling) {
    this.props.selectEnabling(enabling.id);
  }

  deselectEnabling(enabling) {
    this.props.deselectEnabling(enabling.id);
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
          selectedEnablings={this.props.selectedEnablings}
          onClose={() => this.back()}
          onEnablingSelect={(enabling) => this.selectEnabling(enabling)}
          onEnablingDeselect={(enabling) => this.deselectEnabling(enabling)}
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
    selectedEnablings: state.builder.selectedEnablings,
  }),
  dispatch => ({
    deselectEnabling(enablingId) { dispatch(deselectEnabling(enablingId)); },
    getCategoryTree() { dispatch(getBmes()); },
    getEnablingTree() { dispatch(getEnablings()); },
    selectEnabling(enablingId) { dispatch(selectEnabling(enablingId)); },
  })
)(EnablingConditions);


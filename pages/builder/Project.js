import Page from 'pages/Page';
import classnames from 'classnames';
import { Link } from 'routes';

import Layout from 'components/layout/layout';
import SolutionOverview from 'components/explore-detail/SolutionOverview';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import { Router } from 'routes'

import { getBmes, getEnablings } from 'modules/builder';
import { DisclaimerModal, DISCLAIMER_COMPONENTS } from 'components/common/disclaimer/DisclaimerModal';


const transform = (nodes, selectedBMEs) => nodes.map(node => {
  const bmes = (node.bmes || []).filter(bme => selectedBMEs.includes(bme.id));

  return {
    ...node,
    children: bmes.length > 0 ? bmes : transform(node.children || [], selectedBMEs),
  };
}).filter(node => node.level == "1" || node.children.length > 0);

class Project extends Page {
  constructor() {
    super();

    this.state = {
      disclaimer: null,
    };
  }

  componentWillMount() {
    this.props.getCategoryTree();
    this.props.getEnablingTree();
  }

  back() {
    Router.pushRoute('builder');
  }

  render() {
    if (!this.props.categories) {
      return null;
    }

    const bmeTree = transform(this.props.categories, this.props.selectedBMEs)

    const defaultTabItems = [{
      label: 'Project Details',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: 1
        }
      },
    }, {
      label: 'Overview',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: 1,
          subPage: 'overview'
        }
      }
    }];

    const tabItems = [...defaultTabItems, ...bmeTree.map((bme) => ({
      label: bme.name,
      className: 'info',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: 1,
          subPage: bme.slug
        }
      }
    }))];


    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
      >
        <Cover
          position="bottom"
          size='shorter'
          title='Project title'
          image='/static/images/download-data-module.jpg'
          breadcrumbs={<Breadcrumbs items={[{ name: 'Builder', route: 'builder', params: {} }]} />}
        >
          <Button secondary inverse>Share/Export</Button>
          <Button inverse>Save project</Button>
        </Cover>

        <div className="c-tabs -explore">
          <div className="row">
            <ul className="tab-list">
              {tabItems.map((tab, n) => (
                <li
                  key={n}
                  className={classnames("tab-item", { "-current": false })}
                >
                  <Link route={tab.queryParams.route} params={tab.queryParams.params}>
                    <a className="literal">{tab.label}</a>
                  </Link>
                  {tab.className === "info" && (<div className="c-info-icon" onClick={() => this.setState({ disclaimer: tab.queryParams.params.subPage })}>
                    <svg className="icon"><use xlinkHref="#icon-info" /></svg>
                  </div>)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SolutionOverview
          project={{ id: 2, bmeTree: transform(this.props.categories, this.props.selectedBMEs) }}
        />

        <DisclaimerModal
          disclaimer={this.state.disclaimer}
          onClose={() => this.setState({ disclaimer: null })}
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
)(Project);

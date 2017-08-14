import intersection from 'lodash/intersection';
import classnames from 'classnames';
import { Link } from 'routes';
import Page from 'pages/Page';

import Layout from 'components/layout/layout';
import ProjectOverview from 'components/builder-index/ProjectOverview';
import ProjectDetail from 'components/builder-index/ProjectDetail';
import ProjectCategory from 'components/builder-index/ProjectCategory';
import ShareModal from 'components/builder-index/ShareModal';
import { DisclaimerModal } from 'components/common/disclaimer/DisclaimerModal';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';

import { leaves, flattenSolutionTree } from 'utils/builder';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import { Router } from 'routes'

import { getBmes, getEnablings, getSolutions } from 'modules/builder-api';
import { setField, commentBME } from 'modules/builder';


const transform = (nodes, selectedBMEs, commentedBMEs) => nodes.map(node => {
  const bmes = (node.bmes || []).filter(bme => selectedBMEs.includes(bme.id)).map(bme => ({
    ...bme,
    comment: commentedBMEs[bme.id],
  }));

  return {
    ...node,
    children: bmes.length > 0 ? bmes : transform(node.children || [], selectedBMEs, commentedBMEs),
  };
}).filter(node => node.level == "1" || node.children.length > 0);


class Project extends Page {
  constructor() {
    super();

    this.state = {
      modal: null,
      activeTab: 'overview',
    };
  }

  componentWillMount() {
    this.props.getCategoryTree();
    this.props.getEnablingTree();
  }

  back() {
    Router.pushRoute('builder');
  }

  showShareModal = () => this.setState({ modal: 'share' });

  hideModal = () => this.setState({ modal: null });

  download = () => Router.pushRoute('builder-project-print');

  onFieldChange = (name, value) => this.props.setField(name, value);

  changeBMEcomment = (bme, text) => this.props.commentBME(bme.id, text);

  render() {
    if (!this.props.categories) {
      return null;
    }

    const bmeTree = transform(this.props.categories, this.props.selectedBMEs, this.props.commentedBMEs);

    const defaultTabItems = [
      {
        slug: 'overview',
        label: 'Overview',
      },
      {
        slug: 'details',
        label: 'Project Details',
      },
    ];

    const tabItems = [
      defaultTabItems[0],
      ...bmeTree.map((category) => ({
        slug: category.slug,
        label: category.name,
        className: 'info',
      })),
      defaultTabItems[1],
    ];


    return (
      <Layout
        title="Builder"
        queryParams={this.props.queryParams}
        className="c-builder-project"
      >
        <Cover
          position="bottom"
          size='shorter'
          title={this.props.title || "Project title"}
          image='/static/images/download-data-module.jpg'
          breadcrumbs={<Breadcrumbs items={[{ name: '< Back to builder', route: 'builder', params: {} }]} />}
        >
          <Button secondary inverse onClick={this.showShareModal}>Share/Export</Button>
          <Button inverse>Save project</Button>
        </Cover>

        <div className="c-tabs -explore">
          <div className="row">
            <ul className="tab-list">
              {tabItems.map((tab, n) => (
                <li
                  key={n}
                  className={classnames("tab-item", { "-current": this.state.activeTab == tab.slug })}
                >
                  <a className="literal" onClick={() => this.setState({activeTab: tab.slug })}>{tab.label}</a>
                  {tab.className === "info" && (<div className="c-info-icon" onClick={() => this.setState({ disclaimer: tab.slug })}>
                    <svg className="icon"><use xlinkHref="#icon-info" /></svg>
                  </div>)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {this.state.activeTab == 'overview' &&
          <ProjectOverview
            project={{ id: 2, bmeTree }}
          />}

        {this.state.activeTab == 'details' &&
          <ProjectDetail
            project={{ id: 2, bmeTree, impacts: [], externalSources: [], projectBmes: [] }}
            categories={[]}
            fields={{ title: this.props.title, description: this.props.description }}
            onFieldChange={this.onFieldChange}
          />}

        {(this.state.activeTab != 'overview' && this.state.activeTab != 'details') &&
          <ProjectCategory
            category={bmeTree.find(cat => cat.slug == this.state.activeTab)}
            onCommentChange={this.changeBMEcomment}
          />
        }

        {this.state.modal == 'share' && <ShareModal onClose={this.hideModal} onDownload={this.download} />}

        <DisclaimerModal
          categories={bmeTree}
          disclaimer={this.state.disclaimer}
          onClose={() => this.setState({ disclaimer: null })}
        />
    </Layout>
    );
  }
}

export default withRedux(
  store,
  state => {
    const solutions = flattenSolutionTree(state.builderAPI.solutionCategories) || [];
    const selectedSolution = solutions.find(solution => solution.id == state.builder.selectedSolution);
    const selectedBMEs = selectedSolution ? intersection(state.builder.selectedBMEs, selectedSolution.bmes.filter(bme => bme).map(bme => bme.id)) : state.builder.selectedBMEs;

    return ({
      categories: state.builderAPI.bmeCategories,
      enablings: state.builderAPI.enablingCategories || [],
      commentedBMEs: state.builder.commentedBMEs,
      selectedBMEs,
      title: state.builder.title,
      description: state.builder.description,
    });
  },
  dispatch => ({
    commentBME(bmeId, comment) { dispatch(commentBME(bmeId, comment)); },
    getCategoryTree() { dispatch(getBmes()); },
    getEnablingTree() { dispatch(getEnablings()); },
    getSolutions() { dispatch(getSolutions()); },
    setField(field, value) { dispatch(setField(field, value)); },
  })
)(Project);

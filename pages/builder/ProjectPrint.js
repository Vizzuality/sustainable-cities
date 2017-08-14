import intersection from 'lodash/intersection';
import classnames from 'classnames';
import { Link } from 'routes';
import Page from 'pages/Page';

import Layout from 'components/layout/layout';
import Head from 'components/layout/head';
import ProjectOverview from 'components/builder-index/ProjectOverview';
import ProjectDetail from 'components/builder-index/ProjectDetail';
import ProjectCategory from 'components/builder-index/ProjectCategory';
import ShareModal from 'components/builder-index/ShareModal';
import Cover from 'components/common/Cover';
import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';

import { leaves, flattenSolutionTree } from 'utils/builder';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import { Router } from 'routes'

import { getBmes, getEnablings, getSolutions } from 'modules/builder-api';


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


class ProjectPrint extends Page {
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

  render() {
    if (!this.props.categories) {
      return null;
    }

    const bmeTree = transform(this.props.categories, this.props.selectedBMEs, this.props.commentedBMEs);

    return (
      <div>
        <Head />

        <div className="row u-mt-4">
          <div className="u-w-100 u-flex u-flex-sb u-pt-2 u-pb-2 u-bottom-separator u-align-items-center">
            <h1 className="c-title -fs-huge -fw-thin">{this.props.title}</h1>

            <div className="c-text u-flex -fw-bold -uppercase -fs-extrasmall">
              <div className="u-pr-1/2">powered by</div>
              <div className="u-left-separator u-bw-2 u-bc-cc u-pl-1/2">
                <div>financing</div>
                <div>sustainable</div>
                <div>cities</div>
              </div>
            </div>
          </div>
        </div>

        <ProjectOverview
          project={{ id: 2, bmeTree }}
        />

        {bmeTree.filter(category => category.children.length > 0).map(category => <ProjectCategory key={category.id} category={category} readonly={true} />)}
      </div>
    );
  }
}

export default withRedux(
  store,
  state => {
    const solutions = flattenSolutionTree(state.builderAPI.solutionCategories) || [];
    const selectedSolution = solutions.find(solution => solution.id == state.builder.selectedSolution);
    const selectedBMEs = selectedSolution ? intersection(state.builder.selectedBMEs, selectedSolution.bmes.map(bme => bme.id)) : state.builder.selectedBMEs;

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
    getCategoryTree() { dispatch(getBmes()); },
    getEnablingTree() { dispatch(getEnablings()); },
    getSolutions() { dispatch(getSolutions()); },
    setField(field, value) { dispatch(setField(field, value)); },
  })
)(ProjectPrint);


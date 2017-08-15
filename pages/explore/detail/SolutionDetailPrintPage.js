import Page from 'pages/Page';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import Head from 'components/layout/head';
import Button from 'components/common/Button';
import SolutionDetail from 'components/explore-detail/SolutionDetail';
import ProjectOverview from 'components/builder-index/ProjectOverview';
import ProjectCategory from 'components/builder-index/ProjectCategory';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';

import { getProjectDetail, setProjectFilters } from 'modules/project';
import { getBmeCategories } from 'modules/category';


class SolutionDetailPrintPage extends Page {
  componentWillMount() {
    const { id } = this.props.queryParams;

    this.props.setProjectFilters({ detailId: id });
  }

  componentDidUpdate(prevProps) {
    const { projectFilters } = this.props;
    if (!isEqual(prevProps.projectFilters, projectFilters)) {
      const { detailId } = projectFilters;
      this.props.getProjectDetail(detailId);
      this.props.getBmeCategories();
    }
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading project...</div>;
    }

    return (
      <div>
        <Head title="Solution detail" defaultDescription="" />

        <div className="row u-mt-2">
          <div className="u-flex u-ml-a u-hide-print">
            <Button primary onClick={window.print}>
              Print
            </Button>
          </div>
          <div className="u-w-100 u-flex u-flex-sb u-pt-2 u-pb-2 u-bottom-separator u-align-items-center">
            <h1 className="c-title -fs-huge -fw-thin">{this.props.project.name}</h1>

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

        <SolutionDetail
          project={this.props.project}
          categories={this.props.bmeTree}
        />

        <ProjectOverview
          project={this.props.project}
        />

      {this.props.project.bmeTree.
          filter(category => category.children.length > 0).
          map(category => (
            <ProjectCategory
              key={category.id}
              category={category}
              readonly={true}
              bmeDescription={bme => bme.description}
            />
          ))}
      </div>
    );
  }
}

const completeBmeTree = (bmeTree, categories) => {
  if (!bmeTree || !categories) {
    return null;
  }

  // Ugly Number() casts used below because `id` types
  // don't match across requests to different endpoints
  const presentBmeIds = bmeTree.map(bme => bme.id);

  return {
    bmeTree: [
      ...bmeTree,
      ...categories
        .filter(category => !presentBmeIds.includes(Number(category.id)))
        .map(category => ({
          id: Number(category.id),
          name: category.name,
          slug: category.slug,
          children: []
        })
      )]
  };
};


export default withRedux(
  store,
  state => {
    return ({
      categories: state.category.bme.list,
      isLoading: (state.project.loading || isEmpty(state.project.detail)),
      project: {
        ...state.project.detail,
        ...completeBmeTree(state.project.detail.bmeTree, state.category.bme.list)
      },
      projectFilters: state.project.filters
    });
  },
  dispatch => ({
    getProjectDetail(filters) { dispatch(getProjectDetail(filters)); },
    getBmeCategories() { dispatch(getBmeCategories()); },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
  })
)(SolutionDetailPrintPage);

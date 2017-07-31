import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getProjectDetail, setProjectFilters, removeProjectDetail } from 'modules/project';
import { getBmeCategories } from 'modules/category';

// utils
import { getImage } from 'utils/project';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';
import Cover from 'components/common/Cover';
import Tab from 'components/common/Tab';
import Breadcrumbs from 'components/common/Breadcrumbs';
import DownloadData from 'components/common/DownloadData';
import RelatedContent from 'components/explore-detail/RelatedContent';
import ContactForm from 'components/explore-detail/ContactForm';
import SolutionDetail from 'components/explore-detail/SolutionDetail';
import SolutionOverview from 'components/explore-detail/SolutionOverview';
import SolutionCategory from 'components/explore-detail/SolutionCategory';

// modal and its content
import DisclaimerModal from 'components/explore-detail/DisclaimerModal';
import FinancialProduct from 'components/explore-detail/modal-content/FinancialProduct';
import FundingSource from 'components/explore-detail/modal-content/FundingSource';
import DeliveryMechanism from 'components/explore-detail/modal-content/DeliveryMechanism';
import InvestmentComponent from 'components/explore-detail/modal-content/InvestmentComponent';

class SolutionDetailPage extends Page {
  static setBreadcrumbs(project) {
    if (!Object.keys(project).length) return null;
    const { name, slug } = project.category || {};

    return [
      {
        name: 'Solutions',
        route: 'explore-index',
        params: { category: 'solutions' }
      },
      {
        name,
        route: 'explore-index',
        params: { category: 'solutions', subCategory: slug }
      }
    ];
  }

  state = {
    disclaimer: false
  };

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

  componentWillUnmount() {
    this.props.removeProjectDetail();
  }

  toggleDisclaimer(subPage) {
    this.setState({ disclaimer: subPage }, () => {
      // prevent scrolling while the modal is open
      document.getElementsByTagName('body')[0].classList.toggle('no-overflow', !!subPage);
    })
  }

  renderTabs(tabs) {
    const tabEqual = (current, tab) => {
      return !!(
        tab.route == current.route
        && tab.params && tab.params.id == current.id
        && tab.params.subPage == current.subPage
      )
    };

    return (<div className="c-tabs -explore">
      <div className="row">
         <ul className="tab-list">
           {tabs.map((tab, n) => (
             <li
               key={n}
               className={classnames("tab-item", { "-current": tabEqual(this.props.queryParams, tab.queryParams) })}
             >
              <Link route={tab.queryParams.route} params={tab.queryParams.params}>
                <a className="literal">{tab.label}</a>
              </Link>
             {tab.className === "info" && (<div className="disclaimer-icon" onClick={() => this.toggleDisclaimer(tab.queryParams.params.subPage)}>(i)</div>)}
            </li>
         ))}
         </ul>
      </div>
    </div>);
  }

  renderContent() {
    const { project, categories, queryParams } = this.props;

    if (!queryParams.subPage) {
      return (
        <SolutionDetail
          project={project}
          categories={categories}
        />
      )
    } else if (queryParams.subPage === "overview") {
      return (
        <SolutionOverview
          project={project}
        />
      )
    } else {
      let category = project.bmeTree.find((c) => c.slug === queryParams.subPage);
      return (
        <SolutionCategory
          category={category}
        />
      )
    }
  }

  render() {
    const { project, categories, isLoading } = this.props;

    const breadcrumbsItems = SolutionDetailPage.setBreadcrumbs(project);
    const breadcrumbs = breadcrumbsItems ?
      <Breadcrumbs items={breadcrumbsItems} /> : null;

    const defaultTabItems = [{
      label: 'Project Details',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id
        }
      },
    }, {
      label: 'Overview',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id,
          subPage: 'overview'
        }
      }
    }];

    const tabItems = [...defaultTabItems, ...(project.bmeTree || []).map((bme) => ({
      label: bme.name,
      className: 'info',
      queryParams: {
        route: 'solution-detail',
        params: {
          id: project.id,
          subPage: bme.slug
        }
      }
    }))];

    const disclaimerComponents = {
      'funding-source': <FundingSource />,
      'delivery-mechanism': <DeliveryMechanism />,
      'investment-component': <InvestmentComponent />,
      'financial-product': <FinancialProduct />
    };

    return (
      <Layout
        title="Solution detail"
        queryParams={this.props.queryParams}
      >

        <div className='solution-detail-page'>

          {isLoading && (<div>
            Loading project...
          </div>)}

          {!isLoading && (<div>

            <Cover
              title={project.name || ''}
              breadcrumbs={breadcrumbs}
              size='shorter'
              position='bottom'
              image={getImage(project)}
            />

            {this.renderTabs(tabItems)}

            {this.renderContent()}

            <ContactForm />

            <RelatedContent />

            <DownloadData />

          </div>)}

        </div>

        {this.state.disclaimer && <DisclaimerModal onClose={() => this.toggleDisclaimer()}>
          {disclaimerComponents[this.state.disclaimer] || <div>wait, what?</div>}
        </DisclaimerModal>}
      </Layout>
    );
  }
}

SolutionDetailPage.propTypes = {
  // projects
  project: PropTypes.object,
  getProjectDetail: PropTypes.func,
  queryParams: PropTypes.object.isRequired
};

SolutionDetailPage.defaultProps = {
  project: {}
};

const mix = (bmeTree, categories) => {
  if (!bmeTree || !categories) {
    return null;
  }

  // Ugly Number() casts used below because `id` types don't match across requests to different endpoints
  const presentBmeIds = bmeTree.map((bme) => bme.id);
  return {
    bmeTree: [...bmeTree, ...categories.filter(category => !presentBmeIds.includes(Number(category.id))).map(category => ({
      id: Number(category.id),
      name: category.name,
      slug: category.slug,
      children: []
    }))]
  };
};

export default withRedux(
  store,
  state => ({
    // projects
    isLoading: (state.project.loading || isEmpty(state.project.detail)),
    project: {
      ...state.project.detail,
      ...mix(state.project.detail.bmeTree, state.category.bme.list)
    },
    projectFilters: state.project.filters
  }),
  dispatch => ({
    // projects
    getProjectDetail(filters) { dispatch(getProjectDetail(filters)); },
    getBmeCategories() { dispatch(getBmeCategories()) },
    setProjectFilters(filters) { dispatch(setProjectFilters(filters)); },
    removeProjectDetail() { dispatch(removeProjectDetail()); }
  })
)(SolutionDetailPage);

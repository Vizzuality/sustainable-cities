import React from 'react';
import Proptypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { getSolutionPdfs } from 'modules/category';

// components
import Spinner from 'components/common/Spinner';

// constants
import { CATEGORY_ICONS } from 'constants/category';

class Solutions extends React.Component {
  static _getPdfLink(document = {}) {
    const pdfUrl = document && document.attachment ? document.attachment.url : '';
    return `${process.env.API_URL}/${pdfUrl}`;
  }

  componentWillMount() {
    this.props.getSolutionPdfs();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.solutions, nextProps.solutions) ||
      !isEqual(this.props.loading, nextProps.loading);
  }

  render() {
    return (<div className="c-about-content">
      <div className="c-detail-section -content-padding -content-separator">
        <div className="row">
          <div className="column small-12 medium-4">
            <h2 className="c-title -dark -fs-extrabig -fw-light">Solutions</h2>
          </div>
          <div className="column small-12 medium-8">
            <div className="solutions-grid">
              {this.props.loading && <Spinner
                className="-transparent"
                isLoading={this.props.loading}
              />}
              {this.props.solutions.map(solution =>
                <div className="column small-12 medium-6" key={solution.id}>
                  <div className="solution-item">
                    <svg className="icon -huge -dark -in-line-left">
                      <use xlinkHref={`#${CATEGORY_ICONS[solution.slug]}`} />
                    </svg>
                    <h2 className="c-title -huge -dark -fs-extrabig -fw-light">{solution.name}</h2>
                    <p>{solution.description}</p>
                    {solution.document && <a
                      className="c-button -secondary"
                      href={Solutions._getPdfLink(solution.document)}
                      download={`${solution.slug}.pdf`}
                    >
                      Find out more
                    </a>}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="column small-12 medium-8 medium-offset-4">
            <svg className="icon -dark -in-line-left -big -short"><use xlinkHref="#icon-home-about" /></svg>
            <h2 className="c-title -dark -fs-extrabig -fw-light">More coming soon</h2>
          </div>
        </div>
        <div className="row">
          <div className="column small-12">
            <div className="content" />
          </div>
        </div>
      </div>
      <div className="c-detail-section -content-padding">
        <div className="row">
          <div className="column small-12 medium-4">
            <h2 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">Continue reading</h2>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -about" href="/about/blogs">
              <p className="c-title -dark -fs-medium">Blogs</p>
              <p className="c-text">FSCI&apos;s news, discussion and announcements</p>
            </a>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -about" href="/about/more-information">
              <p className="c-title -dark -fs-medium">More information</p>
              <p className="c-text">The initiative&apos;s partners, research methodology and data policy.</p>
            </a>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default withRedux(
  store,
  state => ({
    solutions: state.category.solution.list,
    loading: state.category.solution.loading
  }),
  dispatch => ({
    getSolutionPdfs() { dispatch(getSolutionPdfs()); }
  })
)(Solutions);

Solutions.propTypes = {
  solutions: Proptypes.array,
  loading: Proptypes.bool,
  getSolutionPdfs: Proptypes.func
};

Solutions.defaultProps = {
  solutions: []
};

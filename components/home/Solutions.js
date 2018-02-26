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
    return (
    <div className="row home-solutions">
      <div className="column small-12">
        <h3 className="c-title -dark -fs-huge -fw-thin -title-margin">Documents</h3>
      </div>
      {this.props.solutions.filter(solution => solution.document).map(solution => (

        <div className="column small-12 medium-3" key={solution.id}>
          <div className="c-solution">
            <svg className="icon -huge -dark -in-line-left">
              <use xlinkHref={`#${CATEGORY_ICONS[solution.slug]}`} />
            </svg>
            <h2 className="c-title -fs-big -fw-light">{solution.name}</h2>
            {solution.document && <a
              className="c-button -secondary"
              href={Solutions._getPdfLink(solution.document)}
              download={`${solution.slug}.pdf`}
            >
              Download
            </a>}
          </div>
        </div>
      ))}
    </div>
    );
  }
}

export default withRedux(
  store,
  state => ({
    solutions: state.category.solution.list,
    loading: state.category.solution.loading
  }),
  dispatch => ({
    getSolutionPdfs() {
      dispatch(getSolutionPdfs());
    }
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

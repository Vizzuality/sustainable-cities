import React from 'react';
import PropTypes from 'prop-types';

// redux
import { store } from 'store';
import withRedux from 'next-redux-wrapper';

// modules
import { getDataAbout, resetData } from 'modules/about';

// components
import Spinner from 'components/common/Spinner';

class Blogs extends React.Component {

  componentWillMount() {
    this.props.getBlogs();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const { blogs, loading } = this.props;
    return (
      <div className="c-detail-section">
        <div className="row">
          {loading && <Spinner isLoading className="-transparent" />}
          {blogs.slice(0,4).map(blog => (
            <div key={blog.id} className="column small-12 medium-3">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={blog.link}
                className="post"
              >
                <div className="picture" style={{ backgroundImage: `url(${blog.image})` }} />
                <p className="c-text -dark -fs-medium">{blog.title}</p>
                <span className="c-text -dark -fs-smaller -fw-light -uppercase">{blog.date}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

    );
  }
}

Blogs.propTypes = {
  Blogs: PropTypes.array,
  getBlogs: PropTypes.func
};

Blogs.defaultProps = {
  blogs: []
};

export default withRedux(
  store,
  ({ about }) => ({
    blogs: about.blogs,
    loading: about.loading
  }),
  dispatch => ({
    getBlogs() { dispatch(getDataAbout('blogs')); },
    resetData() { dispatch(resetData()); }
  })
)(Blogs);

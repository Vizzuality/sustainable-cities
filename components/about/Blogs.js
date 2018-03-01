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
      <div className="c-about-content">
        <div className="c-detail-section -content-separator">
          <div className="row">
            <div className="column small-12">
              <h2 className="c-title -dark -fs-huge -fw-thin -title-margin">FSCI Posts</h2>
            </div>
            <div className="column small-12">
              <div className="about-content">
                {loading && <Spinner isLoading className="-transparent" />}
                {blogs.map(blog => (
                  <div key={blog.id} className="column small-12 medium-4">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={blog.link}
                      className="post"
                    >
                      <div className="picture" style={{ backgroundImage: `url(${blog.image})` }} />
                      <p className="c-text -dark -fs-medium -fw-light -lh-small">{blog.title}</p>
                      <span className="c-text -dark -fs-smaller -fw-light -uppercase">{blog.date}</span>
                    </a>
                  </div>
                ))}
              </div>
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
              <a className="main-link -border -about" href="/about/more-information">
                <p className="c-text -fs-medium -dark">More information</p>
                <p className="c-title">The initiative's partners, research methodology and data policy.</p>
              </a>
            </div>
            <div className="column small-12 medium-4">
              <a className="main-link -border -about" href="/about">
                <p className="c-text -fs-medium  -dark">About the initiative</p>
                <p className="c-title">Background information about FSCI and its partners.</p>
              </a>
            </div>
          </div>
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

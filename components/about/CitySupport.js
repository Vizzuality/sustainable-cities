import React from 'react';
import PropTypes from 'prop-types';

// redux
import { store } from 'store';
import withRedux from 'next-redux-wrapper';

// modules
import { getDataAbout, resetData } from 'modules/about';
import getCitiesByCategory from 'selectors/city-support';

// components
import Spinner from 'components/common/Spinner';

class CitySupport extends React.Component {

  componentWillMount() {
    this.props.getCitySupport();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  renderOthers() {
    return (
      <div className="c-detail-section -content-padding">
        <div className="row">
          <div className="column small-12 medium-4">
            <h2 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">Continue reading</h2>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -about" href="/about/blogs">
              <p className="c-text -dark -fs-medium -fw-light">Blogs</p>
              <p className="c-title -dark">FSCI's news, discussion and announcements</p>
            </a>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -about" href="/about/more-information">
              <p className="c-text -dark -fs-medium -fw-light">More information</p>
              <p className="c-title -dark">The initiative's partners, research methodology and data policy.</p>
            </a>
          </div>
          <div className="column small-12 medium-4"></div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -about" href="/about">
              <p className="c-text -dark -fs-medium -fw-light">About the initiative</p>
              <p className="c-title -dark">Background information about FSCI and its partners.</p>
            </a>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -about" href="/about/events">
              <p className="c-text -dark -fs-medium -fw-light">Events</p>
              <p className="c-title -dark">FSCI's forums, workshops and events</p>
            </a>
          </div>
        </div>
      </div>
    );
  }

  renderBlock(category, isEnd) {
    const { loading } = this.props;
    return (
      <div className="c-detail-section -content-separator" key={category.id}>
        <div className="row">
          <div className="column small-12 medium-4">
            <h2 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">{category.title}</h2>
          </div>
          <div className="column small-12 medium-8">
            <div className="row">
              <div className="about-content">
                {(category.cities || []).map(city => (
                  <div key={city.id} className="column small-12 medium-6">
                    <div className="post">
                      <div className="picture" style={{ backgroundImage: `url(${city.image})` }} />
                      {city.imageSource && <span className="c-text -dark -fs-smaller -fw-light -uppercase">image source: {city.imageSource}</span>}
                      <p className="c-title -dark -fs-big -fw-light -lh-small">{city.title}</p>
                      <p className="c-text -dark -fw-light -lh-small">{city.description || ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isEnd && <div className="row">
          <div className="column small-12">
            <div className="content" />
          </div>
        </div>}
      </div>
    );
  }

  render() {
    const { citiesByCategory, loading } = this.props;
    console.log(citiesByCategory)
    return (
      <div className="c-about-content">
        {loading && <Spinner isLoading className="-transparent" />}
        {citiesByCategory.map((cat, index) => this.renderBlock(cat, citiesByCategory.length - 1 === index))}
        {this.renderOthers()}
      </div>);
  }
}

CitySupport.propTypes = {
  citiesByCategory: PropTypes.array,
  getCitySupport: PropTypes.func
};

CitySupport.defaultProps = {
  citiesByCategory: []
};

export default withRedux(
  store,
  (state) => ({
    citiesByCategory: getCitiesByCategory(state),
    loading: state.about.loading
  }),
  dispatch => ({
    getCitySupport() { dispatch(getDataAbout('city-supports')); },
    resetData() { dispatch(resetData()); }
  })
)(CitySupport);

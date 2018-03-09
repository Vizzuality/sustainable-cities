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

  renderBlock(category) {
    const { loading } = this.props;
    return (
      <div className="c-detail-section -content-separator" key={category.id}>
        <div className="row">
          <div className="about-content">
            {category.map(city => (
              <div key={city.id} className="column small-12 medium-4">
                <div className="post">
                  <div className="picture" style={{ backgroundImage: `url(${city.image})` }} />
                  <p className="c-title -dark -fs-big -fw-light -lh-small">{city.title}</p>
                  <p className="c-text -fw-light -lh-small">{city.description || ''}</p>
                  {city.imageSource && <span className="c-text -fs-smaller -fw-light">image source: {city.imageSource}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { citiesByCategory, loading } = this.props;
    return (
      <div className="c-about-content">
        {loading && <Spinner isLoading className="-transparent" />}
        {this.renderBlock(citiesByCategory)}
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

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

  renderBlock(category, isEnd) {
    const { loading } = this.props;
    return (
      <div className="columns c-detail-section" key={category.id}>
        <div className="row">
          {(category.cities || []).slice(0, 2).map(city => (
            <div key={city.id} className="column small-12 medium-6">
              <div className="post">
                <div className="picture" style={{ backgroundImage: `url(${city.image})` }} />
                {city.imageSource && <span className="c-text -dark -fs-smaller -fw-light -uppercase">image source: {city.imageSource}</span>}
                <p className="c-text -dark -fs-medium">{city.title}</p>
                <p className="c-text -fw-light">{city.description || ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { citiesByCategory, loading } = this.props;
    return (
      <div className="small-12 medium-8">
        <div className="c-content">
          {loading && <Spinner isLoading className="-transparent" />}
          {citiesByCategory.map((cat, index) => this.renderBlock(cat, citiesByCategory.length - 1 === index))}
        </div>
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

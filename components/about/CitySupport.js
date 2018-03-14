import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// modules
import { getDataAbout, resetData } from 'modules/about';

// components
import Spinner from 'components/common/Spinner';

class CitySupport extends PureComponent {
  static propTypes = {
    cities: PropTypes.array,
    getCitySupport: PropTypes.func.isRequired
  };

  static defaultProps = { cities: [] };

  componentWillMount() {
    this.props.getCitySupport();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const { cities, loading } = this.props;
    return (
      <div className="c-about-content">
        {loading && <Spinner isLoading className="-transparent" />}
        <div className="c-detail-section -content-separator">
          <div className="row">
            <div className="about-content">
              {cities.map(city => (
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
      </div>);
  }
}

export default connect(
  state => ({
    cities: state.about['city-supports'],
    loading: state.about.loading
  }),
  dispatch => ({
    getCitySupport() { dispatch(getDataAbout('city-supports')); },
    resetData() { dispatch(resetData()); }
  })
)(CitySupport);

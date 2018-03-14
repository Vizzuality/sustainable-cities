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
      <div className="small-12 medium-8">
        <div className="c-content">
          {loading && <Spinner isLoading className="-transparent" />}
          <div className="columns c-detail-section">
            <div className="row">
              {cities.map(city => (
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
        </div>
      </div>);
  }
}

export default connect(
  state => ({
    cities: (state.about['city-supports'] || []).slice(0, 4),
    loading: state.about.loading
  }),
  dispatch => ({
    getCitySupport() { dispatch(getDataAbout('city-supports')); },
    resetData() { dispatch(resetData()); }
  })
)(CitySupport);

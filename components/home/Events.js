import React from 'react';
import PropTypes from 'prop-types';

// redux
import { store } from 'store';
import withRedux from 'next-redux-wrapper';

// modules
import { getDataAbout, resetData } from 'modules/about';

// components
import Spinner from 'components/common/Spinner';

class Events extends React.Component {

  componentWillMount() {
    this.props.getEvents();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const { events, loading } = this.props;

    return (
      <div className="c-detail-section columns small-12 medium-8">
        <div className="row">
          {loading && <Spinner isLoading className="-transparent" />}
          {events.slice(0, 4).map(event => (
            <div key={event.id} className="column small-12 medium-6">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={event.link}
                className="event"
              >
                <div className="picture" style={{ backgroundImage: `url(${event.image})` }} />
                <p className="c-text -dark -fs-medium -fw-light -lh-small">{event.title}</p>
                <span className="c-text -dark -fs-smaller -fw-light -uppercase">{event.date}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Events.propTypes = {
  events: PropTypes.array,
  getEvents: PropTypes.func
};

Events.defaultProps = {
  events: []
};

export default withRedux(
  store,
  ({ about }) => ({
    events: about.events,
    loading: about.loading
  }),
  dispatch => ({
    getEvents() { dispatch(getDataAbout('events')); },
    resetData() { dispatch(resetData()); }
  })
)(Events);

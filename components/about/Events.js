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
      <div className="c-about-content">
        <div className="c-detail-section -content-separator">
          <div className="row">
            <div className="column small-12">
              <h2 className="c-title -dark -fs-huge -fw-thin -title-margin">FSCI Events</h2>
            </div>
            <div className="column small-12">
              <div className="about-content">
                {loading && <Spinner isLoading className="-transparent" />}
                {events.map(event => (
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
                <p className="c-text -dark -fs-medium -fw-light">Blogs</p>
                <p className="c-title -dark">FSCI's news, discussion and announcements</p>
              </a>
            </div>
            <div className="column small-12 medium-4">
              <a className="main-link -border -about" href="/about/city-support">
                <p className="c-text -dark -fs-medium -fw-light">City Support</p>
                <p className="c-title -dark">FSCI's forums, workshops, on-the-ground technical support and long-term engagements.</p>
              </a>
            </div>
            <div className="column small-12 medium-4"></div>
            <div className="column small-12 medium-4">
              <a className="main-link -border -about" href="/about/more-information">
                <p className="c-text -dark -fs-medium -fw-light">More information</p>
                <p className="c-title -dark">The initiative's partners, research methodology and data policy.</p>
              </a>
            </div>
            <div className="column small-12 medium-4">
              <a className="main-link -border -about" href="/about">
                <p className="c-text -dark -fs-medium -fw-light">About the initiative</p>
                <p className="c-title -dark">Background information about FSCI and its partners.</p>
              </a>
            </div>
          </div>
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

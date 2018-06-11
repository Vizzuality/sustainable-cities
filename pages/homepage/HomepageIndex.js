import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';

import withRedux from 'next-redux-wrapper';
import { store } from 'store';
import withTracker from 'hoc/withTracker';

// constants
import { GA_HOMEPAGE } from 'constants/analytics';
import { CATEGORY_ICONS } from 'constants/category';

// content
import Solutions from 'components/home/Solutions';
import Events from 'components/home/Events';
import CitySupport from 'components/home/CitySupport';
import Blogs from 'components/home/Blogs';


class HomePage extends Page {
  static propTypes = {
    queryParams: PropTypes.object.isRequired,
    solutions: PropTypes.array.isRequired
  }

  render() {
    return (
      <Layout
        title="Home"
        queryParams={this.props.queryParams}
      >
        <section className="l-home-header">
          <div className="row">
            <div className="columns small-10 small-offset-1">
              <h1 className="c-title -fs-super-huge -fw-regular -light -center">FINANCING SUSTAINABLE CITIES INITIATIVE</h1>
            </div>
            <div className="column small-10 small-offset-1 medium-8 medium-offset-2">
              <h2 className="c-title -fs-bigger -light -center -subtitle">Helping cities accelerate and scale-up investments in sustainable urban solutions.</h2>
            </div>
          </div>
          <ul className="row">
            {this.props.solutions.map(solution => (
              <li key={solution.id} className="column small-10 small-offset-1 medium-5 medium-offset-1">
                <Link route="explore-index" params={{ category: 'solutions', subCategory: solution.slug }}>
                  <a className="solution-link">
                    <svg className="icon -light -in-line-left -medium"><use xlinkHref={`#${CATEGORY_ICONS[solution.slug] || 'icon-home-about'}`} /></svg>
                    <span className="c-text -fs-bigger -light">{solution.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div className="l-activities">
            <div className="row">
              <div className="columns small-12">
                <h2 className="c-title -dark -fs-huge -fw-thin">FSCI Activities</h2>
              </div>
            </div>
            <div className="row">
              <div className="columns small-12 medium-4">
                <h3 className="c-title -dark -fs-extrabig -fw-thin -title-margin-small">Events</h3>
                <p>Events organised within the FSCI framework provide a platform for dialogue
                  about financing sustainable urban solutions among city officials, investors,
                  technical service providers and other stakeholders.
                </p>
                <a className="c-button -primary" href="/events">More events</a>
              </div>
              <Events />
            </div>
            <div className="row">
              <div className="columns small-12 medium-4">
                <h3 className="c-title -dark -fs-extrabig -fw-thin -title-margin-small">City Support</h3>
                <p>The FSCI engages with cities around the world to provide technical
                  assistance to accelerate and scale-up investments for their sustainable
                  urban projects.
                </p>
                <a className="c-button -primary" href="/city-support">More City Support</a>
              </div>
              <CitySupport />
            </div>
          </div>
        </section>
        <section>
          <div className="l-blog">
            <div className="row">
              <div className="columns small-12 medium-9 large-10 -flex-vertical-centered">
                <h3 className="c-title -dark -fs-huge -fw-thin">Posts about FSCI</h3>
              </div>
              <div className="columns small-12 medium-3 large-2 -flex-vertical-centered">
                <a href="/about/blogs" className="c-button -primary">More blog posts</a>
              </div>
            </div>
            <Blogs />
          </div>
        </section>

        <Solutions />

        <section className="l-home-videos">
          <div className="row">
            <div className="columns small-12 -flex-vertical-centered">
              <h3 className="c-title -dark -fs-huge -fw-thin">About FSCI</h3>
            </div>
            <div className="columns small-12 medium-5">
              <p className="c-text -fw-light">In 2015, <a href="http://www.wrirosscities.org/" target="_blank" rel="noopener noreferrer">WRI Ross Center</a> for Sustainable Cities and
                <a href="www.c40.org" target="_blank" rel="noopener noreferrer">C40 Cities</a>
                Climate Leadership Group, funded by the <a href="http://www.citigroup.com/citi/foundation/" target="_blank" rel="noopener noreferrer">Citi Foundation</a>,
                teamed up for a new partnership to leverage the expertise of our
                three organizations – WRI’s analytical and research
                competencies and long-term engagement with cities,
                the high-level connection with city leaders of C40 and
                the Citi Foundation’s urban economic progress agenda.
              </p>
            </div>
            <div className="columns samll-12 medium-6 medium-offset-1">
              <div className="video-wrapper">
                <iframe title="video-0" src="https://player.vimeo.com/video/210677339" height="480" width="853" allowFullScreen="allowfullscreen" frameBorder="0" />
              </div>
            </div>
          </div>
          <div className="l-video-row">
            <div className="row">
              <div className="columns small-12 medium-6 large-4">
                <div className="video-wrapper">
                  <iframe title="video-1" src="https://www.youtube.com/embed/4NVIToVDHTc" allowFullScreen="allowfullscreen" frameBorder="0" />
                </div>
              </div>
              <div className="columns small-12 medium-6 large-4">
                <div className="video-wrapper">
                  <iframe title="video-2" src="https://www.youtube.com/embed/0JvfYvBRo_o" allowFullScreen="allowfullscreen" frameBorder="0" />
                </div>
              </div>
              {/* <div className="columns small-12 medium-6 large-4">
                <div className="video-wrapper">
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default withRedux(
  store,
  state => ({ solutions: state.category.solution.list })
)(withTracker(HomePage, GA_HOMEPAGE));

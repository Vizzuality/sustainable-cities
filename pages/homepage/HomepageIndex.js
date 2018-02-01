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

// modules
import { getSolutionPdfs } from 'modules/category';

// content
import Solutions from 'components/home/Solutions';
import Events from 'components/home/Events';
import CitySupport from 'components/home/CitySupport';
import Blogs from 'components/home/Blogs';


class HomePage extends Page {

  render() {
    return (
      <Layout
        title="Home"
        queryParams={this.props.queryParams}
      >

        <section className="l-home-header">
          <div className="row">
            <div className="columns small-10 small-offset-1 medium-offset-0 medium-12">
              <h1 className="c-title -fs-super-huge -light -fw-thin -center">Financing Sustainable Cities Initiative</h1>
            </div>
            <div className="column small-10 small-offset-1 medium-8 medium-offset-2">
              <h2 className="c-title -fs-bigger -light -fw-light -center -subtitle">Helping cities develop business models to accelerate sustainable urban solutions</h2>
            </div>
          </div>
          <ul className="row">
            <li className="column small-10 small-offset-1 medium-5 medium-offset-1">
              <Link route="explore-index" params={{ category: 'solutions', subCategory: 'bike-sharing-scheme' }}>
                <a>
                  <svg className="icon -light -in-line-left -medium"><use xlinkHref="#icon-bike" /></svg>
                  <span className="c-text -fs-bigger -light -fw-light">Bike sharing systems</span>
                </a>
              </Link>
            </li>
            <li className="column small-10 small-offset-1 medium-5 medium-offset-1">
              <Link route="explore-index" params={{ category: 'solutions', subCategory: 'bus-rapid-transit-brt' }}>
                <a>
                  <svg className="icon -light -in-line-left -medium"><use xlinkHref="#icon-rapidbus" /></svg>
                  <span className="c-text -fs-bigger -light -fw-light">Bus rapid transit systems</span>
                </a>
              </Link>
            </li>
            <li className="column small-10 small-offset-1 medium-5 medium-offset-1">
              <Link route="explore-index" params={{ category: 'solutions', subCategory: 'low-and-zero-emission-buses' }}>
                <a>
                  <svg className="icon -light -in-line-left -medium"><use xlinkHref="#icon-bus" /></svg>
                  <span className="c-text -fs-bigger -light -fw-light">Low -and zero- emissions buses</span>
                </a>
              </Link>
            </li>
            <li className="column small-10 small-offset-1 medium-5 medium-offset-1">
              <Link route="explore-index" params={{ category: 'solutions', subCategory: 'efficient-new-buildings' }}>
                <a>
                  <svg className="icon -light -in-line-left -medium"><use xlinkHref="#icon-buildings" /></svg>
                  <span className="c-text -fs-bigger -light -fw-light">Efficient new buildings</span>
                </a>
              </Link>
            </li>
            <li className="column small-10 small-offset-1 medium-5 medium-offset-1">
              <Link route="explore-index" params={{ category: 'solutions', subCategory: 'municipal-building-retrofits' }}>
                <a>
                  <svg className="icon -light -in-line-left -medium"><use xlinkHref="#icon-gov" /></svg>
                  <span className="c-text -fs-bigger -light -fw-light">Municipal building retrofits</span>
                </a>
              </Link>
            </li>
            <li className="column small-10 small-offset-1 medium-5 medium-offset-1">
              <Link route="explore-index" params={{ category: 'solutions', subCategory: 'transit-oriented-development-tod' }}>
                <a>
                  <svg className="icon -light -in-line-left -medium"><use xlinkHref="#icon-city" /></svg>
                  <span className="c-text -fs-bigger -light -fw-light">Transit-oriented development</span>
                </a>
              </Link>
            </li>
            <li className="column small-10 small-offset-1 medium-5 medium-offset-1">
              <svg className="icon -light -in-line-left -medium -short"><use xlinkHref="#icon-home-about" /></svg>
              <span className="c-text -fs-bigger -light -fw-light">more coming soon</span>
            </li>
          </ul>
        </section>
        <section>
          <div className="l-activities">
            <div className="row">
              <div className="columns small-12">
                <h2>FSCI Activities</h2>
              </div>
            </div>
            <div className="row">
              <div className="columns small-12 medium-4">
                <h3>Events</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et similique, eveniet porro maxime, assumenda iure eligendi aliquid laudantium culpa quidem aliquam ex, tempore nesciunt, nam perferendis quas sit natus! Possimus.</p>
                <a className="c-button -primary" href="/events">More events</a>
              </div>
              <Events />
            </div>
            <div className="row">
              <div className="columns small-12 medium-4">
                <h3>City Support</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et similique, eveniet porro maxime, assumenda iure eligendi aliquid laudantium culpa quidem aliquam ex, tempore nesciunt, nam perferendis quas sit natus! Possimus.</p>
                <a className="c-button -primary" href="/events">More City Support</a>
              </div>
              <CitySupport />
            </div>
          </div>
        </section>
        <section>
          <div className="l-blog">
            <div className="row">
              <div className="columns small-12 medium-10">
                <h3>Post about FSCI</h3>
              </div>
              <div className="columns small-12 medium-2">
                <a href="/blogs" className="c-button -primary">More blog posts</a>
              </div>
              <Blogs />
            </div>
          </div>
        </section>
        <section className="l-home-call-to-action -intro">
          <div className="row">
            <div className="columns small-12 medium-6 -flex-vertical-centered">
              <div className="call-to-action -no-border">
                <h3 className="c-title -dark -fs-extrabig -fw-light">A global movement</h3>
                <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">More and more city leaders see their actions as critical to helping tackle urgent challenges like climate change and living sustainably with our planet.</p>
              </div>
            </div>
            <div className="columns samll-12 medium-6">
              <div className="video-wrapper">
                <iframe src="https://player.vimeo.com/video/210677339" height="480" width="853" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
              </div>
            </div>
          </div>
        </section>

        <Solutions />

      </Layout>
    );
  }
}

HomePage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

export default withRedux(store)(withTracker(HomePage, GA_HOMEPAGE));

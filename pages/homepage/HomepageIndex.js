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
        <section className="l-home-main-links">
          <ul className="row">
            <li className="columns small-12 medium-4"><Link route="about">
              <a className="main-link">
                <svg className="icon"><use xlinkHref="#icon-home-about" /></svg>
                <p className="c-title -dark -fs-extrabig -fw-light">Learn more about the initiative</p>
              </a>
            </Link></li>
            <li className="columns small-12 medium-4"><Link route="explore-index">
              <a className="main-link">
                <svg className="icon"><use xlinkHref="#icon-home-explore" /></svg>
                <p className="c-title -dark -fs-extrabig -fw-light">Explore sustainable projects</p>
              </a>
            </Link></li>
            <li className="columns small-12 medium-4"><Link route="builder">
              <a className="main-link">
                <svg className="icon"><use xlinkHref="#icon-home-build" /></svg>
                <p className="c-title -dark -fs-extrabig -fw-light">Design a business model</p>
              </a>
            </Link></li>
          </ul>
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
        <section className="l-home-call-to-action -explore">
          <div className="row">
            <div className="columns medium-8 medium-offset-4 large-6 large-offset-6">
              <div className="call-to-action">
                <h3 className="c-title -dark -fs-extrabig -fw-light">Worldwide experimentation</h3>
                <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">Cities worldwide are experimenting with new ways to invest in sustainable solutions. Developing a common understanding of available business models will move us from talk to action.</p>
                <Link route="explore-index"><a className="c-button -primary">start exploring</a></Link>
              </div>
            </div>
          </div>
        </section>
        <section className="l-home-call-to-action -builder">
          <div className="row">
            <div className="columns small-12 medium-8 large-6 -flex-vertical-centered">
              <div className="call-to-action -no-border">
                <h3 className="c-title -dark -fs-extrabig -fw-light">Business model design</h3>
                <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">Get started with designing a sustainable urban project using experiences gained by cities worldwide.</p>
                <Link route="builder"><a className="c-button -primary">design a project</a></Link>
              </div>
            </div>
            <div className="columns small-12 medium-4 large-6">
              <div className="picture">
                <img src="/static/images/home-module-builder.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

HomePage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

export default withRedux(store)(withTracker(HomePage, GA_HOMEPAGE));

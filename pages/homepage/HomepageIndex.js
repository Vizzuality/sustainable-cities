import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import storage from 'local-storage-fallback';

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
import Modal from 'components/common/Modal';
import DisclaimerModal from 'components/common/disclaimer/DisclaimerSign-up';



class HomePage extends Page {

  state = {
    modal: {
      disclaimer: {
        open: true
      }
    }
  };

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
              <h2 className="c-title -fs-bigger -light -fw-light -center -subtitle">Helping cities accelerate and scale-up investments in sustainable urban solution.</h2>
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
                <h2 className="c-title -dark -fs-huge -fw-thin">Financing Sustainable Cities Initiative (FSCI) Activities</h2>
              </div>
            </div>
            <div className="row">
              <div className="columns small-12 medium-4">
                <h3 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">Events</h3>
                <p>Events organised within the FSCI framework provide a platform for dialogue about financing sustainable urban solutions among city officials, investors, technical service providers and other stakeholders.</p>
                <a className="c-button -primary" href="/about/events">More events</a>
              </div>
              <Events />
            </div>
            <div className="row">
              <div className="columns small-12 medium-4">
                <h3 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">City Support</h3>
                <p>The FSCI engages with cities around the world to provide technical assistance to accelerate and scale-up investments for their sustainable urban projects.</p>
                <a className="c-button -primary" href="/about/city-support">More City Support</a>
              </div>
              <CitySupport />
            </div>
          </div>
        </section>
        <section>
          <div className="l-blog">
            <div className="row">
              <div className="columns small-12 medium-10 -flex-vertical-centered">
                <h3 className="c-title -dark -fs-huge -fw-thin">Post about FSCI</h3>
              </div>
              <div className="columns small-12 medium-2 -flex-vertical-centered">
                <a href="/blogs" className="c-button -primary">More blog posts</a>
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
              <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">In 2015, <a href="http://www.wrirosscities.org/" target="_blank">WRI Ross Center</a> for Sustainable Cities and <a href="www.c40.org" target="_blank">C40 Cities</a> Climate Leadership Group, funded by the <a href="http://www.citigroup.com/citi/foundation/" target="_blank">Citi Foundation</a>, teamed up for a new partnership to leverage the expertise of our three organizations – WRI’s analytical and research competencies and long-term engagement with cities, the high-level connection with city leaders of C40 and the Citi Foundation’s urban economic progress agenda.</p>
            </div>
            <div className="columns samll-12 medium-6 medium-offset-1">
              <div className="video-wrapper">
                <iframe src="https://player.vimeo.com/video/210677339" height="480" width="853" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
              </div>
            </div>
          </div>
        </section>

        {this.state.modal.disclaimer.open && <Modal
          open={this.state.modal.disclaimer.open}
          toggleModal={v => this.setState({
            modal: { ...this.state.modal, disclaimer: { open: v } }
          })}
        >
          <DisclaimerModal
            onClose={() => this.setState({
              modal: { ...this.state.modal, disclaimer: { open: false } }
            })}
          />
        </Modal>}

      </Layout>
    );
  }
}

HomePage.propTypes = {
  queryParams: PropTypes.object.isRequired
};

export default withRedux(store)(withTracker(HomePage, GA_HOMEPAGE));

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import Page from 'pages/Page';
import Layout from 'components/layout/layout';

export default class HomePage extends Page {
  render() {
    return (
      <Layout
        title="Home"
        queryParams={this.props.queryParams}
      >
        <section className="l-home-header">
          <div className="row">
            <div className="columns medium-8 medium-offset-2">
              <h1 className="c-title -fs-huge -light -fw-thin">An initiative to accelerate the implementation of <span className="c-title -fs-huge -highlight -fw-thin">sustainable urban solutions</span> trough new business models</h1>
            </div>

          </div>
        </section>
        <section className="l-home-main-links">
          <ul className="row">
            <li className="columns small-12 medium-4"><Link route="explore-index">
              <a className="main-link">
                <svg className="icon"><use xlinkHref="#icon-home-explore" /></svg>
                <p className="c-title -dark -fs-extrabig -fw-light">Explore sustainable projects</p>
              </a>
            </Link></li>
            <li className="columns small-12 medium-4"><Link route="explore-index">
              <a className="main-link">
                <svg className="icon"><use xlinkHref="#icon-home-build" /></svg>
                <p className="c-title -dark -fs-extrabig -fw-light">Design a business model</p>
              </a>
            </Link></li>
            <li className="columns small-12 medium-4"><Link route="explore-index">
              <a className="main-link">
                <svg className="icon"><use xlinkHref="#icon-home-about" /></svg>
                <p className="c-title -dark -fs-extrabig -fw-light">Learn more about the initiative</p>
              </a>
            </Link></li>
          </ul>
        </section>
        <section className="l-home-intro">
          <div className="row">
            <div className="columns medium-8 medium-offset-2">
              <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">A global movement to change how we treat the planet and each other is underway.</p>
            </div>
          </div>
          <div className="row">
            <div className="columns medium-10 medium-offset-1">
              <div className="video-wrapper">
                <iframe src="https://player.vimeo.com/video/210677339" height="480" width="853" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="columns medium-8 medium-offset-2">
              <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">In the past two years, we’ve seen leaders and citizens come together to declare climate change action and sustainable living to be the sensible path forward. At the center of action are cities—places that half the world’s population call home. And millions more will join them in the decades ahead.</p>
            </div>
          </div>
        </section>
        <section className="l-home-call-to-action -explore">
          <div className="row">
            <div className="columns medium-8 medium-offset-4 large-6 large-offset-6">
              <div className="call-to-action">
                <h3 className="c-title -dark -fs-extrabig -fw-light">Explore projects & business models elements</h3>
                <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maiores adipisci enim dolore blanditiis, odio doloribus, dicta temporibus facere, ipsum tempora ducimus nobis. Libero ad commodi cumque sit mollitia, facilis.</p>
                <Link route="explore-index"><a className="c-button -primary">start exploring</a></Link>
              </div>
            </div>
          </div>
        </section>
        <section className="l-home-call-to-action -builder">
          <div className="row">
            <div className="columns medium-8 large-6">
              <div className="call-to-action">
                <h3 className="c-title -dark -fs-extrabig -fw-light">Business models builder</h3>
                <p className="c-text -gray-light -fs-medium -fw-light -lh-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maiores adipisci enim dolore blanditiis, odio doloribus, dicta temporibus facere, ipsum tempora ducimus nobis. Libero ad commodi cumque sit mollitia, facilis.</p>
                <Link route="explore-index"><a className="c-button -primary">start building</a></Link>
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

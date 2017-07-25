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
        Hi there! Welcome to Sustainable Cities!
        <br />
        <Link route="explore-index" params={{ category: 'solutions' }}><a>Explore index page</a></Link>
        <br />
        <Link route="explore-detail" params={{ type: 'solutions', id: 1 }}><a>Explore detail page</a></Link>

        <section className="l-home-header">
          <div className="row">
            <div className="columns large-8 large-offset-2">
              <h1 className="c-title -fs-huge -light -fw-thin">An initiative to accelerate the implementation of <span className="c-title -fs-huge -highlight -fw-thin">sustainable urban solutions</span> trough new business models</h1>
            </div>

          </div>
        </section>
        <section className="l-home-main-links">
          <div className="row">
            <ul>
              <li className="columns large-4"><Link route="explore-index">
                <a className="m-main-link">
                  <p className="c-title -dark -fs-extrabig -fw-light">Explore sustainable projects</p>
                </a>
              </Link></li>
              <li className="columns large-4"><Link route="explore-index">
                <a className="m-main-link">
                  <p className="c-title -dark -fs-extrabig -fw-light">Design a business model</p>
                </a>
              </Link></li>
              <li className="columns large-4"><Link route="explore-index">
                <a className="m-main-link">
                  <p className="c-title -dark -fs-extrabig -fw-light">Learn more about the initiative</p>
                </a>
              </Link></li>
            </ul>
          </div>
        </section>
        <section className="l-home-intro">
          <div className="row">
            <div className="columns large-8 large-offset-2">
              <p className="c-text c-text -gray-light -fs-medium -fw-light -lh-medium">A global movement to change how we treat the planet and each other is underway.</p>
            </div>
          </div>
          <div className="row">
            <div className="columns large-10 large-offset-1">
              <div className="video-wrapper">
                <iframe src="https://player.vimeo.com/video/210677339" height="480" width="853" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="columns large-8 large-offset-2">
              <p className="c-text c-text -gray-light -fs-medium -fw-light -lh-medium">In the past two years, we’ve seen leaders and citizens come together to declare climate change action and sustainable living to be the sensible path forward. At the center of action are cities—places that half the world’s population call home. And millions more will join them in the decades ahead.</p>
            </div>
          </div>
        </section>
        <section className="l-home-call-to-action -explore">
          <div className="row">
            <div className="columns large-6 large-offset-6">
              <div className="m-call-to-action">
                <h3 className="c-title -dark -fs-extrabig -fw-light">Explore projects & business models elements</h3>
                <p className="c-text c-text -gray-light -fs-medium -fw-light -lh-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maiores adipisci enim dolore blanditiis, odio doloribus, dicta temporibus facere, ipsum tempora ducimus nobis. Libero ad commodi cumque sit mollitia, facilis.</p>
                <Link route="explore-index"><a className="c-button -secondary">start exploring</a></Link>
              </div>
            </div>
          </div>
        </section>
        <section className="l-home-call-to-action -builder">
          <div className="row">
            <div className="columns large-6">
              <div className="m-call-to-action">
                <h3 className="c-title -dark -fs-extrabig -fw-light">Business models builder</h3>
                <p className="c-text c-text -gray-light -fs-medium -fw-light -lh-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maiores adipisci enim dolore blanditiis, odio doloribus, dicta temporibus facere, ipsum tempora ducimus nobis. Libero ad commodi cumque sit mollitia, facilis.</p>
                <Link route="explore-index"><a className="c-button -secondary">start building</a></Link>
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

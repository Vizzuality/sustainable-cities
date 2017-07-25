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

        <section className="l-header">
          <div className="row">
            <div className="columns large-8 large-offset-2">
              <h1 className="header -title">An initiative to accelerate the implementation of <span className="-highlited">sustainable urban solutions</span> trough new business models</h1>
            </div>

          </div>
        </section>
        <section className="l-main-links">
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad modi impedit rerum ab omnis repellat necessitatibus voluptate aperiam laborum! Qui, beatae? Tempora sint placeat adipisci fugit ipsa, similique omnis magnam.
            </div>
          </div>
          <div className="row">
            <div className="columns large-10 large-offset-1">
              <iframe src="https://player.vimeo.com/video/210677339" width="640" height="360"></iframe>
            </div>
          </div>
          <div className="row">
            <div className="columns large-8 large-offset-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad modi impedit rerum ab omnis repellat necessitatibus voluptate aperiam laborum! Qui, beatae? Tempora sint placeat adipisci fugit ipsa, similique omnis magnam.
            </div>
          </div>
        </section>
        <section className="l-home-call-to-action -explore">
          <div className="row">
            <div className="columns large-6 large-offset-6">
              <div className="m-call-to-action">
                <h3 className="c-title -dark -fs-extrabig -fw-light">Explore projects & business models elements</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maiores adipisci enim dolore blanditiis, odio doloribus, dicta temporibus facere, ipsum tempora ducimus nobis. Libero ad commodi cumque sit mollitia, facilis.</p>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maiores adipisci enim dolore blanditiis, odio doloribus, dicta temporibus facere, ipsum tempora ducimus nobis. Libero ad commodi cumque sit mollitia, facilis.</p>
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

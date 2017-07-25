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
            <div className="column large-8">
              <h1 className="header -title">An initiative to accelerate the implementation of <span className="-highlited">sustainable urban solutions</span> trough new business models</h1>
            </div>

          </div>
        </section>
        <section className="l-main-links">
          <div className="row">
            <ul className="column large-8">
              <li className="main-link"><a href="">Explore sustainable projects</a></li>
              <li className="main-link"><a href="">Design a business model</a></li>
              <li className="main-link"><a href="">Learn more about the initiative</a></li>
            </ul>
          </div>
        </section>
        <section className="l-home-content">
          <div className="row">
            <div className="column large-8 centered">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad modi impedit rerum ab omnis repellat necessitatibus voluptate aperiam laborum! Qui, beatae? Tempora sint placeat adipisci fugit ipsa, similique omnis magnam.
            </div>
          </div>
          <div className="row">
            <div className="column large-4">

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

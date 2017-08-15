import React from 'react';
import { Link } from 'routes';

export default () => (
  <footer>
    <div className="row">
      <div className="columns small-12">
        <div className="l-footer">
          <div className="row">
            <div className="columns small-12 medium-8">
              <p className="c-text -dark -fs-big -fw-light -tagline">"An initiative to help cities develop business models to accelerate sustainable urban solutions"</p>
            </div>
            <div className="columns small-12 medium-4"></div>
            <div className="columns small-12 medium-4">
              <p className="c-text -fs-small -dark">A partnership between: </p>
              <div className="logos-wrap">
                <a href="http://www.c40.org/" target="_blank" className="logo -footer c40"></a>
                <a href="http://www.wrirosscities.org/" target="_blank" className="logo -footer wri"></a>
              </div>
            </div>
            <div className="columns small-12 medium-2">
              <p className="c-text -fs-small -dark">Founded by: </p>
              <a href="http://www.citigroup.com/citi/foundation/" target="_blank" className="logo -footer citi-foundation"></a>
            </div>
            <div className="columns small-12 medium-4 medium-offset-2">
              <ul className="footer-nav">
                <li>
                  <Link prefetch route="about"><a className="c-text -dark -uppercase -fs-default">about</a></Link>
                </li>
                <li>
                  <Link prefetch route="explore-index"><a className="c-text -dark -uppercase -fs-default">Solutions map</a></Link>
                </li>
                <li>
                  <Link prefetch route="builder"><a className="c-text -dark -uppercase -fs-default">Design</a></Link>
                </li>
                <li>
                  <a className="c-text -dark -uppercase -fs-default">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

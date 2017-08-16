import React from 'react';
import { Link } from 'routes';

export default () => (
  <footer>
    <div className="row">
      <div className="columns small-12">
        <div className="l-footer">
          <div className="row">
            <div className="columns small-12 medium-4">
              <p className="c-text -fs-small -dark">A partnership between </p>
              <div className="logos-wrap">
                <a href="http://www.wrirosscities.org/" target="_blank" rel="noopener noreferrer" className="logo -footer wri" />
                <a href="http://www.c40.org/" target="_blank" rel="noopener noreferrer" className="logo -footer c40" />
              </div>
            </div>
            <div className="columns small-12 medium-2">
              <p className="c-text -fs-small -dark">Funded by </p>
              <a href="http://www.citigroup.com/citi/foundation/" target="_blank" rel="noopener noreferrer" className="logo -footer citi-foundation" />
            </div>

            <div className="columns small-12 medium-6">
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

            <div className="columns small-12 medium-8">
              <p className="c-text -dark -fs-big -fw-light -tagline">&ldquo;An initiative to help cities develop business models to accelerate sustainable urban solutions&rdquo;</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </footer>
);

import React from 'react';

export default function CitySupport() {
  return (<div className="c-about-content">
    <div className="c-detail-section -content-padding -content-separator">
      <div className="row">
        <div className="column small-12">
          <h2 className="c-title -dark -fs-huge -fw-thin">City support</h2>
        </div>

        <div className="column small-12 medium-4">
          <a target="_blank" href="#" className="event">
              <div className="picture -city-support-1"></div>
          </a>
        </div>

        <div className="column small-12 medium-4">
          <a target="_blank" href="#" className="event">
              <div className="picture -city-support-1"></div>
          </a>
        </div>

        <div className="column small-12 medium-4">
          <a target="_blank" href="#" className="event">
              <div className="picture -city-support-1"></div>
          </a>
        </div>

      </div>


      <div className="column small-12 medium-8 medium-offset-4">
        <div className="content"></div>
      </div>
    </div>

    <div className="c-detail-section -content-padding">
      <div className="row">
        <div className="column small-12 medium-4">
          <h2 className="c-title -dark -fs-extrabig -fw-light">Continue reading</h2>
        </div>
        <div className="column small-12 medium-4">
          <a className="main-link -border -about" href="/about/blogs">
            <p className="c-text -dark -fs-medium -fw-light">Blogs</p>
            <p className="c-title -dark">FSCI's news, discussion and announcements</p>
          </a>
        </div>
        <div className="column small-12 medium-4">
          <a className="main-link -border -about" href="/about/more-information">
            <p className="c-text -dark -fs-medium -fw-light">More information</p>
            <p className="c-title -dark">The initiative's partners, research methodology and data policy.</p>
          </a>
        </div>
        <div className="column small-12 medium-4"></div>
        <div className="column small-12 medium-4">
          <a className="main-link -border -about" href="/about">
            <p className="c-text -dark -fs-medium -fw-light">About the initiative</p>
            <p className="c-title -dark">Background information about FSCI and its partners.</p>
          </a>
        </div>
        <div className="column small-12 medium-4">
          <a className="main-link -border -about" href="/about/events">
            <p className="c-text -dark -fs-medium -fw-light">Events</p>
            <p className="c-title -dark">FSCI's forums, workshops and events</p>
          </a>
        </div>
      </div>
    </div>
  </div>);
}

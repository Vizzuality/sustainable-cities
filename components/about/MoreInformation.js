import React from 'react';

export default function MoreInformation() {
  return (
  <div className="c-about-content">
    <div className="c-detail-section -content-padding -content-separator">
      <div className="row">
        <div className="column small-12 medium-4">
          <h2 className="c-title -dark -fs-extrabig -fw-light">Methodology</h2>
        </div>
        <div className="column small-12 medium-8">
          <div className="content">
            <p className="c-text -dark -fs-medium -fw-light">Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id ultricies vehicula ut id elit.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="c-detail-section -content-padding -content-separator">
      <div className="row">
        <div className="column small-12 medium-4">
          <h2 className="c-title -dark -fs-extrabig -fw-light">Data policy</h2>
        </div>
        <div className="column small-12 medium-8">
          <div className="content">
            <p className="c-text -dark -fs-medium -fw-light">Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur.</p>
            <div className="picture -gradient -buildings">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="c-detail-section -content-padding -content-separator">
      <div className="row">
        <div className="column small-12 medium-4">
            <h2 className="c-title -dark -fs-extrabig -fw-light">The partnership</h2>
          </div>
          <div className="column small-12 medium-8">
            <p className="c-text -dark -fs-medium -fw-light">The Financing Sustainable Cities Initiative is a partnership of WRI Ross Center for Sustainable Cities, C40 Cities Climate Leadership Group and the Citi Foundation.</p>
          </div>
        </div>
        <div className="partnership">
          <div className="row">
            <div className="columns small-12 medium-3 medium-offset-4">
              <a href="http://www.wrirosscities.org/" target="_blank" className="logo wri"></a>
            </div>
            <div className="columns small-12 medium-2">
              <a href="http://www.c40.org/" target="_blank" className="logo c40"></a>
            </div>
            <div className="columns small-12 medium-3">
              <a href="http://www.citigroup.com/citi/foundation/" target="_blank" className="logo citi-foundation"></a>
            </div>
            <div className="columns small-12 medium-8 medium-offset-4">
              <div className="content"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="c-detail-section -content-padding">
        <div className="row">
          <div className="column small-12 medium-4">
            <h2 className="c-title -dark -fs-extrabig -fw-light">Continue reading</h2>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -no-height" href="/about/events">
              <p className="c-text -dark -fs-medium -fw-light">Events</p>
              <p className="c-title -dark">FSCI's forums, workshops and events</p>
            </a>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -no-height" href="/about/blogs">
              <p className="c-text -dark -fs-medium -fw-light">Blogs</p>
              <p className="c-title -dark">FSCI's news, discussion and announcements</p>
            </a>
          </div>
          <div className="column small-12 medium-4"></div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -no-height" href="/about/city-support">
              <p className="c-text -dark -fs-medium -fw-light">City Support</p>
              <p className="c-title -dark">FSCI's forums, workshops, on-the-ground technical support and long-term engagements.</p>
            </a>
          </div>
          <div className="column small-12 medium-4">
            <a className="main-link -border -no-height" href="/about/more-information">
              <p className="c-text -dark -fs-medium -fw-light">More information</p>
              <p className="c-title -dark">Background information about FSCI and its partners.</p>
            </a>
          </div>
        </div>
      </div>
    </div>);
}

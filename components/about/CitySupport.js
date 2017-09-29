import React from 'react';
import PropTypes from 'prop-types';

// redux
import { store } from 'store';
import withRedux from 'next-redux-wrapper';

// modules
import { getDataAbout, resetData } from 'modules/about';

// components
import Spinner from 'components/common/Spinner';

class CitySupport extends React.Component {

  componentWillMount() {
    this.props.getCitySupport();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const { cities, loading } = this.props;
    return (
      <div className="c-about-content">
        <div className="c-detail-section -content-separator">
          <div className="row">
            <div className="column small-12 medium-4">
              <h2 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">WRI City Support</h2>
            </div>
            <div className="column small-12 medium-8">
              <div className="row">
                <div className="about-content">
                  {loading && <Spinner isLoading className="-transparent" />}
                    {cities.map(city => (
                      <div key={city.id} className="column small-12 medium-6">
                        <div className="post">
                          {city.imageSource && <span className="c-text -dark -fs-smaller -fw-light -uppercase">image source: {city.imageSource}</span>}
                          <div className="picture" style={{ backgroundImage: `url(${city.image})` }} />
                          <p className="c-title -dark -fs-big -fw-light -lh-small">{city.title}</p>
                          <p className="c-text -dark -fw-light -lh-small">{city.description || ''}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column small-12 medium-4">
                <h2 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">C40 City Support</h2>
              </div>

              <div className="column small-12 medium-8">
                <div className="row">
                  <div className="column small-12 medium-6">
                    <div className="post">
                      <div className="picture -city-12"></div>
                      <p className="c-title -dark -fs-big -fw-light -lh-small">FSCI Lead Finance Sessions at C40 Transit Oriented Development Network Workshop, Portland.</p>
                      <p className="c-text -dark -fw-light -lh-small">On 25 July 2017, representatives from 13 global cities gathered in Portland, USA for the third C40 Transit Oriented Development (TOD) Network Workshop. FSCI facilitated content throughout the workshop on financing TOD, focusing on how to recoup private sector increase in land value from public sector investment in transit and neighbourhood improvements in hard and soft infrastructure. </p>
                    </div>
                  </div>

                  <div className="column small-12 medium-6">
                    <div className="post">
                      <div className="picture -city-13"></div>
                      <p className="c-title -dark -fs-big -fw-light -lh-small">Clean Bus Finance Academy 2017</p>
                      <p className="c-text -dark -fw-light -lh-small">Senior city finance and transport officials came together at in London for the C40 Clean Bus Finance Academy to provide peer-to-peer advice based on their experiences with electric buses. The three-day Academy involved candid lesson sharing and collaboration between the cities of Auckland, Buenos Aires, Cape Town, Durban, London, Los Angeles, Mexico City, Oslo, Paris, Santiago de Chile, Seattle and Tshwane. The cities also worked with invited technical experts to explore new funding, finance and procurement options to create new business models for electric buses.</p>
                    </div>
                  </div>

                  <div className="column small-12 medium-6">
                    <div className="post">
                      <div className="picture -city-14"></div>
                      <p className="c-title -dark -fs-big -fw-light -lh-small">Financing Sustainable Cities Forum 2017 Brings Together Sustainable Investment Leaders</p>
                      <p className="c-text -dark -fw-light -lh-small">In April 2017, C40 hosted the Financing Sustainable Cities Forum at the iconic London City Hall. Through this event, FSCI provided a dynamic space for over 250 senior city officials, leaders from the investment community, private and public sectors, and the non-profit community to discuss barriers and solutions to scale up investment in sustainable infrastructure and services in cities around the world.</p>
                    </div>
                  </div>

                  <div className="column small-12 medium-6">
                    <div className="post">
                      <div className="picture -city-15"></div>
                      <p className="c-title -dark -fs-big -fw-light -lh-small">2016 Financing Transit Oriented Development Workshop</p>
                      <p className="c-text -dark -fw-light -lh-small">C40 and Transport for Cape Town hosted a workshop for three fellow South African C40 cities focusing on the challenges faced in financing and delivering sustainable and inclusive transit-oriented development (TOD). FSCI facilitated knowledge sharing and technical expert content focused on helping cities identify new financial instruments to support their spatial development plans and drive greater investment in public transport, affordable housing, mixed-use development, and non-motorized transport infrastructure.</p>
                    </div>
                  </div>

                  <div className="column small-12 medium-6">
                    <div className="post">
                      <div className="picture -city-16"></div>
                      <p className="c-title -dark -fs-big -fw-light -lh-small">Finance Sessions at the C40 Transit Oriented Development Network, Curitiba</p>
                      <p className="c-text -dark -fw-light -lh-small">In April 2016, representatives from 17 C40 cities gathered in Curitiba, Brazil for the second Transit Oriented Development Network Workshop. A C40 FSCI representative facilitated content focusing on strategies to fund development and transit, and realize TOD projects. Additionally, a prototype TOD Finance Platform was presented, which set out the options available to cities to finance TOD.</p>
                    </div>
                  </div>

                  <div className="column small-12 medium-6">
                    <div className="post">
                      <div className="picture -city-17"></div>
                      <p className="c-title -dark -fs-big -fw-light -lh-small">C40 Financing Sustainable Cities Forum & Workshop 2016, Rio de Janeiro</p>
                      <p className="c-text -dark -fw-light -lh-small">Global leaders in city finance met in Rio de Janeiro on 5 April 2016 for the first-of-its-kind global forum to accelerate the financing of climate action in cities. The C40 Financing Sustainable Cities Forum brought together over 130 representatives from government, non-government organisations and financial institutions to collaborate on solutions to bridge the gap between city climate ambitions and the investment community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column small-12">
                <div className="content" />
              </div>
            </div>
          </div>


          <div className="c-detail-section -content-padding">
            <div className="row">
              <div className="column small-12 medium-4">
                <h2 className="c-title -dark -fs-extrabig -fw-light -title-margin-small">Continue reading</h2>
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
}

CitySupport.propTypes = {
  cities: PropTypes.array,
  getCitySupport: PropTypes.func
};

CitySupport.defaultProps = {
  cities: []
};

export default withRedux(
  store,
  ({ about }) => ({
    cities: about.list,
    loading: about.loading
  }),
  dispatch => ({
    getCitySupport() { dispatch(getDataAbout('city-supports')); },
    resetData() { dispatch(resetData()); }
  })
)(CitySupport);

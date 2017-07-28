import React from 'react';
import PropTypes from 'prop-types';

import SummarySection from 'components/explore-detail/SummarySection';

const summaryPlaceholderItems = [
  'Sidewalk/plazas ',
  'Space between landscaped areas or adjacent infrastructure ',
  'Dedicated Bicycle Lanes ',
  '3rd Generation ',
  'Road Safety ',
  'Branding ',
  'Bicycle Culture ',
  'Special Equipment ',
  'Scoping, planning, and project design (including feasibility studies) ',
  'Bike and Station Assembly'
];


const categoryPlaceholderItems = [
  {
    title: 'Tangible Assets',
    items: [{
      title: 'Land',
      items: [{
        title: 'Sidewalks/Plazas'
      }, {
        title: 'Space between landscaped areas and adjacent to other infrastructure'
      }]
    }, {
      title: 'Infrastructure',
      items: [{
        title: 'Dedicated Bycicle Lanes'
      }]
    }, {
      title: 'Special equipment',
      items: [{
        title: '3rd Generation',
        description: '3rd Generation bike-share system comprising of over 3,500 bikes across 405 stations.'
      }]
    }],
  }, {
    title: 'Intangible Assets',
    items: [{
      title: 'Safety & Health',
      items: [{
        title: 'Road Safety',
        description: 'DDOT and Arlington County have several initiatives such as GoDCGo, BikeArlington, and so on that provide users resources for biking safely in the region. The various jurisdictions have also developed a rich network of dedicated bicycle lanes, and periodically publish maps detailing bicycle routes and trails.',
      }]
    }, {
      title: 'Human capital & culture 1',
      items: [{
        title: 'Branding',
        description: 'Capital Bikeshare has emerged as a strong brand. Branded merchandise is available for purchase online.'
      }, {
        title: 'Bycicle Culture',
        description: 'The scheme has a Member Benefits program that entitles users to avail discounts and special offers at participating businesses. The scheme also organizes bicycle classes in DC and Arlington to enable prospective users to get acquainted with safe bicycling practices in an urban setting.',
      }]
    }, {
      title: 'Human capital & culture 2',
      items: [{
        title: 'Transit Access',
        description: 'The bike-share stations are located outside metro stations in the region, and also major bus stops and activity hubs.'
      }, {
        title: 'Registration Alternatives',
        description: 'The program enables users without bank accounts to register via Bank on DC, an initiative in the DC metro area for underbanked and unbanked individuals. Arlington County accepts cash payments from Arlington Residents for memberships and user fees, enabling people without bank accounts to access the system.',
      }, {
        title: 'Affordability',
        description: 'The scheme has a Community Partners Program that provides organizational memberships to local non-profits, government agencies, and social services organizations to enable them to offer low-income individuals, a steeply discounted annual membership. Bank on DC members gets $35 off an annual membership . Additionally, a limited amount of funding is available through the Montgomery County Low-Income Bikeshare Program (MCLiberty) to enable low-income individuals living or working in the county to use the program.',
      }]
    }]
  }
]

export default function ProjectOverview({ project }) {
  console.log(project);
  return (<div className='solution-detail-category'>
    <div className='solution-detail-category-summary'>
      <div className="row">
        <div className='column large-12 c-text -fs-huge -fw-thin'>
          Summary
        </div>
      </div>
      <div className="row">
        <div className='column large-12 c-text'>
          <ul className='summary-items'>
            {summaryPlaceholderItems.map((item, n) => (<li key={n}>{item}</li>))}
          </ul>
        </div>
      </div>
    </div>
    <div className='solution-detail-category-list'>
      {categoryPlaceholderItems.map((c, n) => <SummarySection
        key={n}
        title={c.title}
        items={c.items}
      />)}
    </div>
  </div>);
}

ProjectOverview.propTypes = {

};

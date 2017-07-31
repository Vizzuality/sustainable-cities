import React from 'react';
import PropTypes from 'prop-types';

const summaryItemsPlaceholder = [
  {
    title: 'Finance',
    items: [],
  },
  {
    title: 'Funding',
    items: [
      'Membership subscription fees',
      'User charges',
      'Advertising revenue',
      'Public grant',
      'Donation',
      'City budget',
    ]
  },
  {
    title: 'Legal framework',
    items: [
      'Procurement contract',
      'Request for proposal',
      'Operating concession',
      'Sponsorship agreement',
      'Public-private partnership',
      'Bicycle plan ',
    ]
  },
  {
    title: 'Investment components',
    items: [
      'Sidewalk/plazas',
      'Space between landscaped areas or adjacent infrastructure',
      'Dedicated Bicycle Lanes',
      '3rd Generation',
      'Road Safety',
      'Branding',
      'Bicycle Culture',
      'Special Equipment',
      'Scoping, planning, and project design (including feasibility studies)',
      'Bike and Station Assembly ',
    ],
  }
];

export default function ProjectOverview({ project }) {
  return (<div className='solution-detail-overview'>
    <div className='solution-detail-overview-summary'>
      <div className='row'>
        <div className='column large-12 c-text -fs-huge -fw-thin'>
          Summary
        </div>
      </div>
      <div className='row'>
        <div className='column large-12 c-text -fs-huge -fw-thin'>
        </div>
      </div>
    </div>
  </div>);
}

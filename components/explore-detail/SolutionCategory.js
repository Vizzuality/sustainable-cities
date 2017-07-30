import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

import SummarySection from 'components/explore-detail/SummarySection';

const flatten = (category) => {
  let flattened = [];

  category.children.forEach((child) =>
    child.children && child.children.forEach((child) =>
      child.children && child.children.forEach((child) =>
        flattened.push(child))));

  return flattened;
}


export default function SolutionCategory({ category }) {

  let summaryItems = flatten(category);

  return (<div className='solution-category'>
    <div className='solution-category-summary'>
      <div className="row">
        <div className='column large-12 c-text -fs-huge -fw-thin'>
          Summary
        </div>
      </div>
      <div className="row">
        <div className='column large-12 c-text'>
          <ul className='summary-items'>
            {summaryItems.map((item, n) => (<li key={n}>
              <a href={`#${item.slug}`}>{item.name}</a>
            </li>))}
          </ul>
        </div>
      </div>
    </div>
    <div className='solution-category-list'>
      {category.children.map((child, n) => <SummarySection
        key={child.id}
        parent={category}
        category={child}
      />)}
    </div>
  </div>);
}

SolutionCategory.propTypes = {
  category: PropTypes.object,
}

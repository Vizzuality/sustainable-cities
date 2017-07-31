import React from 'react';
import PropTypes from 'prop-types';

import SummarySection from 'components/explore-detail/SummarySection';

const flatten = (category) => {
  const flattened = [];

  category.children.forEach(child =>
    child.children && child.children.forEach(grandchild =>
      grandchild.children && grandchild.children.forEach(grandgrandchild =>
        flattened.push(grandgrandchild))));

  return flattened;
};


export default function SolutionCategory({ category }) {
  const summaryItems = flatten(category);

  return (<div className="solution-category">
    <div className="solution-category-summary">
      <div className="row">
        <div className="column large-12 c-text -fs-huge -fw-thin">
          Summary
        </div>
      </div>
      <div className="row">
        <div className="column large-12 c-text">
          <ul className="summary-items">
            {summaryItems.map(item => (<li key={item.id}>
              <a href={`#${item.slug}`}>{item.name}</a>
            </li>))}
          </ul>
        </div>
      </div>
    </div>
    <div className="solution-category-list">
      {category.children.map(child => <SummarySection
        key={child.id}
        parent={category}
        category={child}
      />)}
    </div>
  </div>);
}

SolutionCategory.propTypes = {
  category: PropTypes.object
};

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


export default function SolutionCategory({ category, projectBmes }) {
  const summaryItems = flatten(category);

  return (<div className="solution-category">
    <div className="solution-category-summary">
      <div className="row">
        <div className="column large-12 c-text -dark -fs-huge -fw-thin">
          Summary
        </div>
      </div>
      {summaryItems.length === 0 && (<div className="row">
        <div className="column large-12 c-text">
          <ul className="summary-items">
            <li>
              <span>There is no information available for this category</span>
            </li>
          </ul>
        </div>
      </div>)}
      {summaryItems.length > 0 && (<div className="row">
        <div className="column large-12 c-text">
          <ul className="summary-items">
            {summaryItems.map(item => (<li key={item.id}>
              <a href={`#${item.slug}`}>{item.name}</a>
            </li>))}
          </ul>
        </div>
      </div>)}
    </div>
    {category.children.length > 0 && (<div className="solution-category-list">
      {category.children.map(child => <SummarySection
        key={child.id}
        parent={category}
        category={child}
        projectBmes={projectBmes}
      />)}
    </div>)}
  </div>);
}

SolutionCategory.propTypes = {
  category: PropTypes.object
};

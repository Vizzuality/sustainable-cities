import React from 'react';
import PropTypes from 'prop-types';

import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

export default function SummarySection({ category, parent }) {

  let titleColor = CATEGORY_FIRST_LEVEL_COLORS[parent.slug] || CATEGORY_FIRST_LEVEL_COLORS.default;

  return (<div className='c-summary-section'>
    <div className='row title'>
      <div className='column large-12 c-text -fs-huge -fw-thin'>
        <span style={{ borderBottom: `2px solid ${titleColor}` }}>
          {category.name}
        </span>
      </div>
    </div>
    {category.children.map((child, n) => (<div key={n} className='row subtitle'>
      <div className='column large-4 c-text -fs-extrabig -fw-light'>
        {child.name}
      </div>
      <div className='column large-8'>
        {child.children && child.children.map((child) => (<div id={child.slug} className='subsubitem' key={child.id}>
          <div className='row subsubtitle'>
            <div className='column large-12 c-text -fs-big -fw-light'>
              {child.name}
            </div>
          </div>
          <div className='row description'>
            <div className='column large-12 c-text'>
              {child.description}
            </div>
          </div>
        </div>))}
      </div>
    </div>))}
  </div>);
}

SummarySection.propTypes = {
  parent: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

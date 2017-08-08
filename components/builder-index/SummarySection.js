import React from 'react';
import PropTypes from 'prop-types';

import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

export default function SummarySection({ category, parent }) {
  const titleColor = CATEGORY_FIRST_LEVEL_COLORS[parent.slug] ||
    CATEGORY_FIRST_LEVEL_COLORS.default;

  return (<div className="c-summary-section">
    <div id={category.slug} className="row title">
      <div className="column large-12 c-text -fs-huge -fw-thin">
        <span style={{ borderBottom: `2px solid ${titleColor}` }}>
          {category.name}
        </span>
      </div>
    </div>
    {category.children.map(child => (<div id={child.slug} key={child.id} className="row subtitle">
      <div className="column large-4 c-text -fs-extrabig -fw-light">
        {child.name}
      </div>
      <div className="column large-8">
        {child.children && child.children.map(grandchild => (<div id={grandchild.slug} className="subsubitem" key={grandchild.id}>
          <div className="row subsubtitle">
            <div className="column large-12 c-text -fs-big -fw-light">
              {grandchild.name}
            </div>
          </div>
          <div className="row description">
            <div className="column large-12 c-text -lh-medium">
              <textarea placeholder="Write here...">{grandchild.comment}</textarea>
            </div>
          </div>
        </div>))}
      </div>
    </div>))}
  </div>);
}

SummarySection.propTypes = {
  parent: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

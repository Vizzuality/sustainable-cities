import React from 'react';
import PropTypes from 'prop-types';

import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

export default function SummarySection({ category, parent, projectBmes }) {
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
      <div className="column small-12 medium-4 c-text -fs-extrabig -fw-light">
        {child.name}
      </div>
      <div className="column small-12 medium-8">
        {child.children && child.children.map(grandchild => (<div id={grandchild.slug} className="subsubitem" key={grandchild.id}>
          <div className="row subsubtitle">
            <div className="column large-12 c-text -fs-big -fw-light">
              <a href={`/business-model-elements/${grandchild.id}`}>{grandchild.name}</a>
            </div>
          </div>
          <div className="row description">
            <div className="column large-12 c-text -lh-medium">
              {(projectBmes.find((b) => b.bmeId === grandchild.id)).description}
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

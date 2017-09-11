import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';

export default function OverviewSection({ bme, projectId }) {
  const titleColor = CATEGORY_FIRST_LEVEL_COLORS[bme.slug] || CATEGORY_FIRST_LEVEL_COLORS.default;

  return (<div className="c-overview-section">
    <div className="row">
      <div className="column small-12 medium-12 h-first">
        <div className="c-text -fs-huge -fw-thin">
          <span style={{ borderBottom: `2px solid ${titleColor}` }}>
            {bme.name}
          </span>
        </div>
      </div>
    </div>
    {bme.children.map(child => (<div key={child.id} className="row">
      <div className="column small-12 medium-4 h-second">
        <div className="c-text -fs-extrabig -fw-light">
          {child.name}
        </div>
      </div>
      <div className="column small-12 medium-8 details">
        <div className="separator" style={{ backgroundColor: titleColor }} />
        {child.children.map(grandchild => (<div key={grandchild.id} className="h-third">
          <div className="c-text -fs-big -fw-light">
            {grandchild.name}
          </div>
          <ul>
            {grandchild.children.map(grandgrandchild => (<li key={grandgrandchild.id}>
              <Link route={`/solutions/${projectId}/${bme.slug}#${grandgrandchild.slug}`}>
                <a className="c-text -fs-extrasmall -uppercase h-fourth -dark">
                  {grandgrandchild.name}
                </a>
              </Link>
            </li>))}
          </ul>
        </div>))}
      </div>
    </div>))}
  </div>);
}

OverviewSection.propTypes = {
  projectId: PropTypes.string.isRequired,
  bme: PropTypes.object.isRequired
};

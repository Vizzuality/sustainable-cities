import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

import { CATEGORY_FIRST_LEVEL_COLORS } from 'constants/category';


const enablingLabel = (count) => (
  count == 1 ?
  `${count} enabling condition` :
  `${count} enabling conditions`
);

export default function SummarySection({
  bmeDescription,
  category,
  onBMEDisplay,
  onCommentChange,
  onDeleteCustomElement,
  parent,
  readonly,
}) {
  const titleColor = CATEGORY_FIRST_LEVEL_COLORS[parent.slug] ||
    CATEGORY_FIRST_LEVEL_COLORS.default;

  return (
    <div className="c-summary-section">
      <div id={category.slug} className="row title">
        <div className="column large-12 c-text -fs-huge -fw-thin">
          <span style={{ borderBottom: `2px solid ${titleColor}` }}>
            {category.name}
          </span>
        </div>
      </div>
      {(category.children || []).map(child => (
        <div id={child.slug} key={child.id} className="row subtitle">
          <div className="column large-4 c-text -fs-extrabig -fw-light">
            {child.name}
          </div>
          <div className="column large-8">
            {(child.children || []).map((grandchild, i) => (
              <div id={grandchild.slug} className="subsubitem" key={grandchild.id || `custom-${i}`}>
                <div className="row subsubtitle">
                  <div className="column large-12 c-text -fs-big -fw-light u-flex u-flex-sb">
                    <div className="u-flex">
                      <div>{grandchild.name}</div>
                      {!readonly && !grandchild.private &&
                          <div
                            className="c-info-icon u-inline-block u-ml-1/2 u-pointer"
                            onClick={() => onBMEDisplay(grandchild, 'info')}
                          >
                            <svg className="icon"><use xlinkHref="#icon-info" /></svg>
                          </div>
                      }
                    </div>

                    {!readonly && grandchild.private &&
                        <Button
                          secondary
                          onClick={() => onDeleteCustomElement(grandchild)}
                        >Delete</Button>
                    }
                  </div>
                </div>
                <div className="row description">
                  <div className="column large-12 c-text -lh-medium">
                    {
                      !readonly && grandchild.selectedEnablings.length > 0 &&
                        <a
                          className="c-title -uppercase -fw-light -fs-smaller u-mb-1 u-block u-pointer"
                          onClick={() => onBMEDisplay(grandchild, 'enabling-conditions')}
                        >
                          {enablingLabel(grandchild.selectedEnablings.length)}
                        </a>
                    }

                    { readonly ?
                        <div className="u-mt-1">
                          {bmeDescription(grandchild)}
                        </div> :
                        <textarea
                          placeholder="Write here..."
                          onChange={(e) => onCommentChange(grandchild, e.target.value)}
                          value={grandchild.comment}
                        />
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

SummarySection.propTypes = {
  parent: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  bmeDescription: PropTypes.func.isRequired,
};

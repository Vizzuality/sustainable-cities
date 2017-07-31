import React from 'react';
import PropTypes from 'prop-types';

export default function RelatedContent() {
  return (
    <div className="c-related-content">
      <div className="row">
        <div className="column large-12 c-title -fs-huge -fw-thin">
          Related Content
        </div>
      </div>
    </div>
  );
}

RelatedContent.propTypes = PropTypes.any;

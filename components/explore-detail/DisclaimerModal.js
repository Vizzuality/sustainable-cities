import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

export default function DisclaimerModal({ onClose, children }) {
  return (<div className="c-modal">
    <div className="content">

      {children}
      <div className="actions">
        <Button onClick={onClose}>OK</Button>
      </div>

      <div className="dismiss" onClick={onClose}>&times;</div>
    </div>
  </div>);
}

DisclaimerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

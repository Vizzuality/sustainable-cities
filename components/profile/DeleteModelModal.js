import React from 'react';
import PropTypes from 'prop-types';

// components
import Button from 'components/common/Button';

export default function DeleteModelModal({ project, onClose, onDelete, token }) {
  const onConfirm = () => {
    onDelete(token, project['link-edit']);
    onClose();
  };

  return (
    <div className="c-delete-model-modal">
      <p className="c-text -dark -fs-medium -fw-light">Are you sure you want to delete &quot;{project.title}&quot;?</p>

      <div className="actions">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  );
}

DeleteModelModal.propTypes = {
  token: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};


DeleteModelModal.defaultProps = {
  project: {}
};

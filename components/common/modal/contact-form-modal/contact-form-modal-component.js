import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Spinner from 'components/common/Spinner';
import Button from 'components/common/Button';

class ContactFormModal extends PureComponent {
  static propTypes = {
    success: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired
  }

  render() {
    const {
      success,
      error,
      loading,
      onCloseModal
    } = this.props;

    const message = success && !error ?
      'Your message was sent successfully!': 'Ops! Something went wrong';

    return (
      <div className="c-contact-form-modal">
        {loading ?
          <Spinner className="-transparent" isLoading />:
        <div className="content">
          <h2 className="c-title -fs-bigger -center">{message}</h2>
          {success &&
            <div className="confirmed-container" />}
          <div className="button-container">
            <Button
              onClick={onCloseModal}
              secondary
              padding
            >
              Accept
            </Button>
          </div>
        </div>}
      </div>
    );
  }
}

export default ContactFormModal;

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

export default class DisclaimerModal extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { disclaimer } = nextProps;

    // prevent scrolling while the modal is open
    document.getElementsByTagName('body')[0].classList.toggle('no-overflow', !!disclaimer);
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { categories, onClose, disclaimer } = this.props;

    const category = categories.find(cat => cat.slug === disclaimer);
    const { label, description } = category || {};

    if (!category) {
      return null;
    }

    return (
      <section className="disclaimer">
        <h1 className="c-title -fw-thin -fs-huge">{label}</h1>
        <p className="c-text -fs-medium -fw-light">{description}</p>

        <div className="actions">
          <Button onClick={onClose}>OK</Button>
        </div>
      </section>
    );
  }
}

DisclaimerModal.propTypes = {
  categories: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  disclaimer: PropTypes.string
};

DisclaimerModal.defaultProps = {
  categories: []
};

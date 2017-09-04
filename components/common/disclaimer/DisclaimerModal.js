import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
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

        <p className="c-text -dark -fs-medium -fw-light">
          Visit this <Link
            route="about"
            params={{
              section: 'more-information'
            }}
          >
            <a>link</a>
          </Link> for further information.
        </p>

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

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
    const { onClose, disclaimer } = this.props;


    return (
      <section className="disclaimer">
        <h1 className="c-title -dark -fs-huge -fw-thin">Welcome!</h1>
        <p className="c-text -fs-medium -fw-light">Welcome to the Beta version of the Financing Sustainable Cities Web Platform! Please feel free to explore the features that are currently available.</p>
        <p className="c-text -fs-medium -fw-light">The full version of our platform will be up and running soon, but in the meantime we invite you to sign up to our mailing list to stay up-to-date with our progress.</p>

        <p className="c-text -dark -fs-medium -fw-light">Sign up for updates</p>

        <form className="c-form" action="">
          <input className="c-input" type="text" placeholder="Your email address"/>
          <input className="c-submit c-button -secondary" type="submit" value="send" onClick={onClose} />
        </form>

        <p className="c-text -dark -fs-medium -fw-light">Thank you!</p>

        <div className="actions">
          <Button onClick={onClose}>Ok</Button>
        </div>
      </section>
    );
  }
}

DisclaimerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  disclaimer: PropTypes.string
};

DisclaimerModal.defaultProps = {
};

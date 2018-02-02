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
        <h1 className="c-title -fw-thin -fs-huge">Welcome!</h1>
        <p className="c-text -fs-medium -fw-light">Description Beta lorem ipsum nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>

        <p className="c-text -dark -fs-medium -fw-light">
          Sign up for updates
        </p>

        <form className="c-form" action="">
          <input className="c-input" type="text" placeholder="Your email address"/>
          <input className="c-submit c-button -secondary" type="submit" value="send" onClick={onClose} />
        </form>

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

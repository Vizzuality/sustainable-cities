import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import storage from 'local-storage-fallback';

// Redux
import withRedux from 'next-redux-wrapper';
import { store } from 'store';

// modules
import { setEmail } from 'modules/sign-up';

// components
import Button from 'components/common/Button';

class DisclaimerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { disclaimer } = nextProps;

    // prevent scrolling while the modal is open
    document.getElementsByTagName('body')[0].classList.toggle('no-overflow', !!disclaimer);
  }

  handleClose = () => {
    storage.setItem('diclaimer.signUp', true);
    this.props.onClose();
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.setEmail(this.state.email);
    this.handleClose();
  }

  handleInput = (e) => {
    this.setState({ email: e.target.value });
  }

  render() {
    const { onClose, disclaimer } = this.props;

    return (
      <section className="disclaimer">
        <h1 className="c-title -dark -fs-huge -fw-thin">Welcome!</h1>
        <p className="c-text -fs-medium -fw-light">Welcome to the Beta version of the Financing Sustainable Cities Web Platform! Please feel free to explore the features that are currently available.</p>
        <p className="c-text -fs-medium -fw-light">The full version of our platform will be up and running soon, but in the meantime we invite you to sign up to our mailing list to stay up-to-date with our progress.</p>

        <p className="c-text -dark -fs-medium -fw-light">Sign up for updates</p>

        <form className="c-form" action="" onSubmit={this.submitForm}>
          <input
            className="c-input"
            type="text"
            placeholder="Your email address"
            defaultValue={this.state.email}
            onChange={this.handleInput}
          />
          <input className="c-submit c-button -secondary" type="submit" value="send"

          />
        </form>

        <p className="c-text -dark -fs-medium -fw-light">Thank you!</p>

        <div className="actions">
          <Button onClick={this.handleClose}>Ok</Button>
        </div>
      </section>
    );
  }
}

export default withRedux(
  store,
  state => state,
  dispatch => ({
    setEmail(email) {
      dispatch(setEmail(email));
    }
  })
)(DisclaimerModal);

DisclaimerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  disclaimer: PropTypes.string,
  setEmail: PropTypes.func
};

DisclaimerModal.defaultProps = {
};

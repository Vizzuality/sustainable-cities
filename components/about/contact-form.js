import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { setFormValue, onSubmit, resetForm } from 'modules/contact-form';

// components
import Button from 'components/common/Button';

class ContactForm extends PureComponent {
  static propTypes = {
    formValues: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    setFormValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetForm();
  }

  handleSubmit = e => {
    e && e.preventDefault();

    this.props.onSubmit();
  }

  handleInput = (event) => {
    const { name, value} = event.target;

    this.props.setFormValue({ name, value });
  }

  render() {
    const {
      'contact-name': contactName,
      email,
      message
    } = this.props.formValues;

    return (
      <div className="c-contact-form">
        <div className="row">
          <div className="columns small-12">
            <h2 className="c-title -dark -fs-huge -fw-thin -center">
              Contact Financing Sustainable Cities
            </h2>
            <form className="c-form" onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="row">
                  <div className="columns small-12 medium-6">
                    <h3 className="form-element-name">Contact name</h3>
                    <input
                      name="contact-name"
                      className="input-text"
                      type="text"
                      placeholder="Your name"
                      defaultValue={contactName}
                      required
                      onChange={this.handleInput}
                    />
                  </div>
                  <div className="columns small-12 medium-6">
                    <h3 className="form-element-name">Email</h3>
                    <input
                      name="email"
                      className="input-text"
                      type="email"
                      placeholder="example@email.org"
                      defaultValue={email}
                      required
                      onChange={this.handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="row">
                  <div className="columns small-12">
                      <h3 className="form-element-name">Message</h3>
                      <textarea
                        name="message"
                        rows="10"
                        placeholder="Your message here"
                        defaultValue={message}
                        required
                        onChange={this.handleInput}
                      />
                    </div>
                </div>
              </div>
              <div className="form-row">
                <div className="row">
                  <div className="columns small-12">
                    <div className="buttons-container">
                      <Button
                        primary
                        padding
                        submit
                      >
                        Send message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    formValues: state.contactForm.fields,
    loading: state.contactForm.loading,
    success: state.contactForm.success,
    error: state.contactForm.error
  }),
  dispatch => ({
    setFormValue(field) { dispatch(setFormValue(field)); },
    onSubmit() { dispatch(onSubmit()); },
    resetForm() { dispatch(resetForm()); }
  })
)(ContactForm);
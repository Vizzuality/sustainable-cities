import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/common/Button';

import { login } from 'modules/auth';


class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: "",
  }

  defaultProps = {
    onLogin: () => {},
  }

  onLoginClick() {
    this.props.
      login(this.state.email, this.state.password).
      then(success => {
        if (success) {
          this.props.onLogin();
        }
      }
    );
  }

  onChange(field, value) {
    this.setState({ [field]: value })
  }

  render() {
    return (
      <div className="c-modal">
        <div className="content">
          <section className="builder-help">
            <h1 className="c-title -fw-thin -fs-huge">Sign up</h1>

            <p className="c-text">
              <input placeholder="Email" onChange={(e) => this.onChange('email', e.target.value)} />
            </p>

            <p className="c-text">
              <input type="password" placeholder="Password" onChange={(e) => this.onChange('password', e.target.value)} />
            </p>

            <p className="c-text">
              <input type="password" placeholder="Repeat password" onChange={(e) => this.onChange('passwordConfirmation', e.target.value)} />
            </p>

            <div className="actions">
              <Button secondary onClick={this.props.onLogin}>Login</Button>
              <Button primary onClick={this.props.onSignUp}>Sign up</Button>
            </div>

            <div className="dismiss" onClick={this.props.onClose}>&times;</div>
          </section>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state.auth,
  dispatch => ({
    login(email, password) { return dispatch(login(email, password)); },
  }),
)(SignUp);

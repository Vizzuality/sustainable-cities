import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/common/Button';

import { register } from 'modules/auth';


class SignUp extends React.Component {
  state = {
    name: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  }

  defaultProps = {
    onLogin: () => {},
  }

  onSignUpClick() {
    this.props.
      register(
        this.state.name,
        this.state.nickname,
        this.state.email,
        this.state.password,
        this.state.passwordConfirmation
      ).
      then(success => {
        if (success) {
          this.props.onSignUp();
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

            <input
              className="u-block u-w-100 u-mt-1 input-text"
              placeholder="Name"
              onChange={(e) => this.onChange('name', e.target.value)}
            />

            <input
              className="u-block u-w-100 u-mt-1 input-text"
              placeholder="Nickname"
              onChange={(e) => this.onChange('nickname', e.target.value)}
            />

            <input
              className="u-block u-w-100 u-mt-1 input-text"
              placeholder="Email"
              onChange={(e) => this.onChange('email', e.target.value)}
            />

            <input
              className="u-block u-w-100 u-mt-1 input-text"
              type="password"
              placeholder="Password"
              onChange={(e) => this.onChange('password', e.target.value)}
            />

            <input
              className="u-block u-w-100 u-mt-1 input-text"
              type="password"
              placeholder="Repeat password"
              onChange={(e) => this.onChange('passwordConfirmation', e.target.value)}
            />

            <div className="actions">
              <Button secondary onClick={this.props.onLogin}>Login</Button>
              <Button primary onClick={() => this.onSignUpClick()}>Sign up</Button>
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
    register(name, nickname, email, password, passwordConfirmation) { return dispatch(register(name, nickname, email, password, passwordConfirmation)); },
  }),
)(SignUp);

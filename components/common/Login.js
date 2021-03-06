import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/common/Button';

import { clearErrors, login } from 'modules/auth';


class Login extends React.Component {
  state = {
    email: "",
    password: "",
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
    this.setState({ [field]: value });
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  render() {
    return (

      <section className="builder-help">
        <h1 className="c-title -fw-thin -fs-huge">Login</h1>

        {this.props.errors.map((error, i) => <p key={i}>{error.title}</p>)}

        <input className="u-block u-w-100 input-text" placeholder="Email" onChange={(e) => this.onChange('email', e.target.value)} />

        <input className="u-block u-w-100 u-mt-1 input-text" type="password" placeholder="Password" onChange={(e) => this.onChange('password', e.target.value)} />

        <div className="actions">
          <Button secondary onClick={this.props.onSignUp}>Sign up</Button>
          <Button primary onClick={() => this.onLoginClick()}>Login</Button>
        </div>
      </section>
    );
  }
}

export default connect(
  state => state.auth,
  {
    clearErrors,
    login,
  },
)(Login);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { emailAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleInput = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const { email, password } = this.state;
    const numbersix = 6;
    if (email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    && password.length >= numbersix) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, email } = this.state;
    const { funcEmail, history } = this.props;
    return (
      <form>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ this.handleInput }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ this.handleInput }
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ () => {
            funcEmail(email);
            history.push('/carteira');
          } }
        >
          Entrar

        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  funcEmail: (email) => dispatch(emailAction(email)),
});

Login.propTypes = {
  funcEmail: Proptypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

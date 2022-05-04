import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { emailAction } from '../actions';
import style from './style/Login.module.css';

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
      <main className={ style.main }>
        <form className={ style.form }>
          <label htmlFor="email">
            USUÁRIO
            <input
              type="email"
              name="email"
              id="email"
              data-testid="email-input"
              onChange={ this.handleInput }
              className={ style.user }
            />
          </label>
          <label htmlFor="password">
            SENHA
            <input
              type="password"
              name="password"
              data-testid="password-input"
              id="password"
              onChange={ this.handleInput }
              className={ style.password }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => {
              funcEmail(email);
              history.push('/carteira');
            } }
            className={ style.button }
          >
            ENTRAR

          </button>
        </form>
      </main>
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

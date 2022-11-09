import React, { Component } from 'react';

import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { emailAction } from '../redux/actions';

import style from '../style/Login.module.css';
import validationSchema from '../servers/validation';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleInput = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
  }

  handleButton = () => {
    const { funcEmail, history } = this.props;
    const { email, password } = this.state;
    funcEmail(email);
    const { error } = validationSchema(email, password);
    if (error) {
      this.setState({ error });
    } else {
      this.setState({ error: '' });
      history.push('/carteira');
    }
  }

  render() {
    const { error } = this.state;

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
            onClick={ this.handleButton }
            className={ style.button }
          >
            ENTRAR
          </button>
          {error && <p>{error}</p>}
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

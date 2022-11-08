import React, { Component } from 'react';

import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../assets/imgs/logo.svg';
import user from '../assets/imgs/user-logo.svg';
import wallet from '../assets/imgs/wallet-logo.svg';
import style from '../style/Hearder.module.css';

class Header extends Component {
  render() {
    const { userEmail, despesas } = this.props;

    return (
      <header className={ style.container }>
        <section className={ style['container-logo'] }>
          <img src={ logo } alt="logo-trybewallet" />
          <h1>TRYBEWALLET</h1>
        </section>
        <section className={ style.wallet }>
          <Link to="carteira">
            <img src={ wallet } alt="wallet-logo" />
          </Link>
          <div className={ style.value }>
            <div data-testid="header-currency-field">R$</div>
            <div data-testid="total-field" />
            {
              despesas.length > 0
                ? despesas.map(({ currency, value, exchangeRates }) => (
                  Number(value) * Number(exchangeRates[currency].ask)))
                  .reduce((elem3, elem2) => (elem3 + elem2)).toFixed(2)
                : 0.00
            }
          </div>
        </section>
        <section className={ style.user }>
          <img src={ user } alt="user-logo" />
          <p data-testid="email-field">{userEmail}</p>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  despesas: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  despesas: PropTypes.arrayOf(string),
}.isRequired;

export default connect(mapStateToProps)(Header);

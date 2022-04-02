import PropTypes, { string } from 'prop-types';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     despesa: 0,
  //   };
  // }

  render() {
    const { userEmail, despesas } = this.props;
    // const newDespesas = despesas.slice(1);
    const numberDespesa = despesas.map(({ currency, value, exchangeRates }) => (
      Number(value) * Number(exchangeRates[currency].ask)));

    return (
      <header>
        <div data-testid="email-field">{userEmail}</div>
        <div data-testid="total-field">
          {
            despesas.length > 0
              ? numberDespesa.reduce((elem3, elem2) => (elem3 + elem2)).toFixed(2)
              : 0
          }

        </div>
        <div data-testid="header-currency-field">BRL</div>
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

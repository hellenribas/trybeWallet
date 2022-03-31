import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, despesas } = this.props;
    return (
      <header>
        <div data-testid="email-field">{userEmail}</div>
        {despesas.length > 0 ? (
          <div data-testid="total-field" />) : (<div data-testid="total-field">0</div>
        )}
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
}.isRequired;

export default connect(mapStateToProps)(Header);

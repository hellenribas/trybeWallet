import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     carteira: [],
  //   };
  // }

  componentDidMount() {
    const { fetchCurrenciesProp } = this.props;
    fetchCurrenciesProp();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form>
          <input
            type="number"
            data-testid="value-input"
            name="despesa"
          />
          <input
            type="text"
            data-testid="description-input"
            name="descrição"
          />
          <label htmlFor="options-currencies">
            Moeda
            <select id="options-currencies">
              {currencies.map((elem) => <option key={ elem }>{elem}</option>)}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento
            <select data-testid="method-input" id="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category-input" data-testid="tag-input">
            Tag
            <select id="category-input" data>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  fetchCurrenciesProp: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

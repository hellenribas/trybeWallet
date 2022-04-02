import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { fetchCurrencies, expensesAction, fetchAsk } from '../actions';

const Alimentação = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
    };
  }

  componentDidMount() {
    const { fetchCurrenciesProp } = this.props;
    fetchCurrenciesProp();
  }

  handleInput = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
  }

  saveExpensesClick = () => {
    const { saveExpenses, fetchAsks } = this.props;
    const { value, description, method, currency, tag } = this.state;
    saveExpenses({ value, description, method, currency, tag });
    fetchAsks();
    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, method, currency, tag } = this.state;
    return (
      <div>
        <Header />
        <form>
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleInput }
          />
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleInput }
          />
          <label htmlFor="options-currencies">
            Moeda
            <select
              id="options-currencies"
              onChange={ this.handleInput }
              name="currency"
              value={ currency }
            >
              {currencies.map((elem) => <option key={ elem }>{elem}</option>)}
            </select>
          </label>
          <label htmlFor="method-inputs">
            Método de Pagamento
            <select
              data-testid="method-input"
              id="method-inputs"
              name="method"
              value={ method }
              onChange={ this.handleInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category-input">
            Categoria
            <select
              id="category-input"
              data-testid="tag-input"
              onChange={ this.handleInput }
              name="tag"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.saveExpensesClick }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: () => dispatch(fetchCurrencies()),
  saveExpenses: (expenses) => dispatch(expensesAction(expenses)),
  fetchAsks: () => dispatch(fetchAsk()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchange: state.wallet.expenses,
});

Wallet.propTypes = {
  fetchCurrenciesProp: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

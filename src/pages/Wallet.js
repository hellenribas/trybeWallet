import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { fetchCurrencies, fetchAsk, editAction } from '../actions';
import Table from './Table';

const Alimentação = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
      edit: false,
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
    const { saveExpenses } = this.props;
    this.setState((prevState) => ({ id: prevState.id + 1 }));
    const { value, description, method, currency, tag, id } = this.state;
    saveExpenses({ value, description, method, currency, tag, id });
    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
    });
  }

  editExpensesClick = () => {
    const { editExpenses, exchange } = this.props;
    const { value, description, method, currency, tag, idTarget } = this.state;
    const { exchangeRates } = exchange[idTarget];
    const id = idTarget;
    editExpenses({ value, description, method, currency, tag, id, exchangeRates });
    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
    });
  }

  receiveEdit = (idTarget) => {
    this.setState({
      edit: true,
      idTarget,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, method, currency, tag, edit } = this.state;
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
              data-testid="currency-input"
              value={ currency }
            >
              {currencies
                .map((elem, index) => <option key={ `${elem}${index}` }>{elem}</option>)}
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
          { edit
            ? (
              <button
                type="button"
                onClick={ () => this.editExpensesClick() }
              >
                Editar despesa

              </button>
            )
            : (
              <button
                type="button"
                onClick={ this.saveExpensesClick }
              >
                Adicionar despesa

              </button>)}
        </form>
        <Table receiveEdit={ this.receiveEdit } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: () => dispatch(fetchCurrencies()),
  saveExpenses: (expenses) => dispatch(fetchAsk(expenses)),
  editExpenses: (expenses) => dispatch(editAction(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchange: state.wallet.expenses,
});

Wallet.propTypes = {
  fetchCurrenciesProp: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

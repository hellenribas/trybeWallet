/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import Header from './Header';
import { fetchCurrencies, fetchAsk, editAction } from '../actions';
import style from './style/Wallet.module.css';
import Footer from './Footer';

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
      redirect: false,
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
    const { value, description, method, currency, tag, id } = this.state;
    this.setState((prevState) => ({ id: prevState.id + 1 }), () => {
      saveExpenses({ value, description, method, currency, tag, id });
      this.setState({
        value: 0,
        description: '',
        method: 'Dinheiro',
        currency: 'USD',
        tag: Alimentação,
      });
    });
  }

  editExpensesClick = () => {
    const { editExpenses, exchange, idTarget } = this.props;
    const { value, description, method, currency, tag } = this.state;
    const { exchangeRates } = exchange[idTarget];
    const id = idTarget;
    editExpenses({ value, description, method, currency, tag, id, exchangeRates });
    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: Alimentação,
      redirect: true,
    });
  }

  render() {
    const { currencies, edit, receiveEditOff } = this.props;
    const { value, description, method, currency, tag, redirect } = this.state;
    return (
      <div className={ style.container }>
        <Header />
        <div className={ style.container_form }>
          <form className={ style.form }>
            <div className={ style.head }>
              <h1 className={ style.title }>ADICIONAR DESPESAS</h1>
              { edit
                ? (
                  <button
                    type="button"
                    onClick={ () => {
                      this.editExpensesClick();
                      receiveEditOff();
                    } }
                  >
                    <BiEditAlt className={ style['edit-pen'] } />

                  </button>
                )
                : (
                  <button
                    type="button"
                    onClick={ this.saveExpensesClick }
                  >
                    +

                  </button>)}
            </div>
            <label htmlFor="value">
              <span>Quanto você pagou?</span>
              <input
                type="number"
                data-testid="value-input"
                name="value"
                id="value"
                value={ value }
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="description">
              O que você comprou?
              <input
                type="text"
                data-testid="description-input"
                name="description"
                id="description"
                value={ description }
                placeholder="exemplo: café"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="category-input">
              Qual a categoria?
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
            <label htmlFor="method-inputs">
              Como você pagou?
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
            <label htmlFor="options-currencies">
              Qual a Moeda utilizada?
              <select
                id="options-currencies"
                onChange={ this.handleInput }
                name="currency"
                data-testid="currency-input"
                value={ currency }
              >
                {currencies
                  .map((elem, index) => (
                    <option
                      key={ `${elem}${index}` }
                    >
                      {elem}
                    </option>))}
              </select>
            </label>
            <Link
              to="/despesas"
            >
              <button type="button" className={ style.link_expenses }>DESPESAS</button>
            </Link>
          </form>
        </div>
        <Footer />
        {redirect && <Redirect to="/despesas" />}
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

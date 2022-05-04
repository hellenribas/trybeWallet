/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Footer from './Footer';
import { removeAction } from '../actions';
import Header from './Header';
import style from './style/Table.module.css';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  render() {
    const { expenses, removeExpense, receiveEdit } = this.props;
    const { redirect } = this.state;
    return (
      <div className={ style.container }>
        <Header />
        <section className={ style.main }>
          {expenses.length === 0
            ? (
              <section className={ style.container_section }>
                <Link
                  to="/carteira"
                >
                  <button
                    type="button"
                    className={ style.link_wallet }
                  >
                    +
                  </button>

                </Link>
                <h3>ADICIONE DESPESAS</h3>
              </section>
            )
            : (
              <table className={ style.table }>
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Tag</th>
                    <th>Pagamento</th>
                    <th>Valor</th>
                    <th>Moeda</th>
                    <th>Câmbio</th>
                    <th>Valor Convertido</th>
                    <th>Moeda de Conversão</th>
                    <th>Editar/Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  { expenses.length > 0 && (expenses.map((elem) => (
                    <tr key={ `${elem.id}` }>
                      <td>{elem.description}</td>
                      <td>{elem.tag}</td>
                      <td>{elem.method}</td>
                      <td>{Number(elem.value).toFixed(2)}</td>
                      <td>
                        {
                          elem.exchangeRates[elem.currency].name.split('/')[0]
                        }
                      </td>
                      <td>
                        {
                          (Number(elem.exchangeRates[elem.currency].ask).toFixed(2))
                        }

                      </td>
                      <td>
                        {
                          (Number(elem.value)
                          * Number(elem.exchangeRates[elem.currency].ask))
                            .toFixed(2)
                        }
                      </td>
                      <td>Real</td>
                      <td className={ style.button_container }>
                        <button
                          type="button"
                          data-testid="edit-btn"
                          onClick={ () => {
                            receiveEdit(elem.id);
                            this.setState({ redirect: true });
                          } }
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          onClick={ () => removeExpense(elem.id) }
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            )}
          { redirect && <Redirect to="/carteira" /> }
        </section>
        { expenses.length > 0
        && (
          <Link to="carteira" className={ style.add }>
            <button
              type="button"
              className={ style.button }
            >
              ADICIONAR MAIS

            </button>

          </Link>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeAction(id)),
});

Table.propTypes = {
  expenses: propTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);

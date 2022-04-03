import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeAction } from '../actions';

class Table extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     edit: false,
  //   };
  // }

  // handleEdit = () => {
  //   this.setState({
  //     edit: true,
  //   });
  // }

  render() {
    const { expenses, removeExpense, receiveEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0 && expenses.map((elem) => (
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
              <td>{(Number(elem.exchangeRates[elem.currency].ask).toFixed(2))}</td>
              <td>
                {(Number(elem.value) * Number(elem.exchangeRates[elem.currency].ask))
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeExpense(elem.id) }
                >
                  Excluir
                </button>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => receiveEdit(elem.id) }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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
              {/* <td>{elem}</td> */}
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

Table.propTypes = {
  expenses: propTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);

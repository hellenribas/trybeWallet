// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

let actionNew = '';

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES': return { ...state };
  case 'RECEIVE_CURRENCIES': return {
    ...state,
    currencies: state.currencies.concat(action.currencies),
  };
  case 'EXPENSES_ACTION': {
    actionNew = action;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  }
  case 'REQUEST_ASK': return { ...state };
  case 'RECEIVE_ASK': {
    actionNew.expense.exchangeRates = action.data;
    return {
      ...state,
      expenses: [...state.expenses],
    };
  }
  default: return state;
  }
};

export default wallet;

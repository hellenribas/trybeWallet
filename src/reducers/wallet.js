// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES': return { ...state };
  case 'RECEIVE_CURRENCIES': return {
    ...state,
    currencies: state.currencies.concat(action.currencies),
  };
  default: return state;
  }
};

export default wallet;

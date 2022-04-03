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
  case 'REQUEST_ASK': return { ...state };
  case 'RECEIVE_ASK': {
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };
  }
  case 'REMOVE_EXPENSE': return {
    ...state,
    expenses: state.expenses.filter(({ id }) => id !== action.id),
  };
  case 'EDIT_ACTION': {
    const { id } = action.editExp;
    state.expenses[id] = action.editExp;
    console.log(state.expenses, id);
    return {
      ...state,
      expenses: [...state.expenses],
    };
  }
  default: return state;
  }
};

export default wallet;

// Coloque aqui suas actions

const EMAIL_ACTION = 'EMAIL_ACTION';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
const REQUEST_ASK = 'REQUEST_ASK';
const RECEIVE_ASK = 'RECEIVE_ASK';

export const emailAction = (email) => ({ type: EMAIL_ACTION, email });

// export const expensesAction = (expense) => ({ type: EXPENSES_ACTION, expense });

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();
  delete data.USDT;
  const keysData = Object.keys(data);
  dispatch(receiveCurrencies(keysData));
};

const requestAsk = () => ({
  type: REQUEST_ASK,
});

const receiveAsk = (data) => ({
  type: RECEIVE_ASK,
  data,
});

export const fetchAsk = (expenses) => async (dispatch) => {
  dispatch(requestAsk());
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await request.json();
  const obj = { ...expenses, exchangeRates };
  dispatch(receiveAsk(obj));
};

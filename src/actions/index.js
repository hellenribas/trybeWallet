// Coloque aqui suas actions

const EMAIL_ACTION = 'EMAIL_ACTION';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const emailAction = (email) => ({ type: EMAIL_ACTION, email });

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

const validationSchema = (email, passoword) => {
  const SIX = 6;
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!(email.match(regex))
  || passoword.length < SIX) return { error: 'email ou senha inválida' };
  return true;
};

export default validationSchema;

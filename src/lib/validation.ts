export const isValidEmail = (email: string) => {
  const reg = /([a-zA-Z0-9]@{1}[a-zA-Z0-9])/;
  if (email.match(reg)) return true;
  return false;
};

export const isValidPassword = (password: string) => {
  const reg = /^([a-zA-Z0-9]{8})/;
  if (password.match(reg)) return true;
  return false;
};

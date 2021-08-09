export let TOKEN_KEY = '';
export let user = '';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(user);
export const login = (token, userLogin) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(user, userLogin);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(user);
};
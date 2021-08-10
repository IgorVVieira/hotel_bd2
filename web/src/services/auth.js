export let TOKEN_KEY = '';
export let userSignIn = '';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(userSignIn);
export const setUser = (user) => {
  localStorage.removeItem(userSignIn);
  localStorage.setItem(userSignIn, user);
}
export const login = (token, userLogin) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(userSignIn, userLogin);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(userSignIn);
};
import axios from 'axios';

export const login = credentials => {
  return axios.post('/login', credentials);
};

export const logout = () => {
  return axios.post('/logout');
};

export const getSession = () => {
  return axios.post('/session');
};

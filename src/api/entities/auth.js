import axios from 'axios';

// set axios timeout
axios.defaults.timeout = 3600000; 

export const login = credentials => {
  return axios.post('/login', credentials);
};

export const logout = () => {
  return axios.post('/logout');
};

export const getSession = () => {
  return axios.post('/session');
};

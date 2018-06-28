import axios from 'axios';

export const signup = form => {
  return axios.post('/user/signup', form);
};

export const getUser = username => {
  return axios.get(`/user/${username}`);
};

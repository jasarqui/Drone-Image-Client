import axios from 'axios';

// creates a user
export const signup = form => {
  return axios.post('/user/signup', form);
};

// gets a username by email
export const getEmail = email => {
  return axios.get(`/user/${email}`);
};

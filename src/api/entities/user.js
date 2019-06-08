import axios from 'axios';

// set axios timeout
axios.defaults.timeout = 3600000; 

// creates a user
export const signup = form => {
  return axios.post('/user/signup', form);
};

// gets a username by email
export const getEmail = email => {
  return axios.get(`/user/${email}`);
};

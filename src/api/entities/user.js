import axios from 'axios';

// creates a user
export const signup = form => {
  return axios.post('/user/signup', form);
};

// gets a username by username
export const getUser = username => {
  return axios.get(`/user/byUname/${username}`);
};

// gets a username by email
export const getEmail = email => {
  return axios.get(`/user/byEmail/${email}`);
};

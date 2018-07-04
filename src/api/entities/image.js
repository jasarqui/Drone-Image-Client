import axios from 'axios';

// saves an image
export const save = info => {
  return axios.post('/img/save', info);
};

// gets the images
export const getImages = () => {
  return axios.get('/img');
};

// gets one image
export const getImage = id => {
  return axios.get(`/img/${id}`);
};

// deletes an image
export const deleteImage = id => {
  return axios.delete(`/img/${id}`);
};

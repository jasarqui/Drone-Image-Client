import axios from 'axios';

// saves an image
export const save = info => {
  return axios.post('/img/save', info);
};

// gets the images
export const getImages = () => {
  return axios.get('/img');
};

// updates an image's info
export const updateImage = info => {
  return axios.put('/img/update', info);
};

/*
// deletes an image
export const deleteImage = id => {
  return axios.delete(`/img/${id}`);
};
*/

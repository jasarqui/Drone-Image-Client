import axios from 'axios';

// saves an image
export const save = info => {
  return axios.post('/img/save', info);
};

// saves images
export const saveMany = images => {
  return axios.post('/img/saveMany', images);
};

// updates an image's info
export const updateImage = info => {
  return axios.put('/img/update', info);
};

// gets the total number of pages for pagination
export const countPages = ({ myUpload, category, showData, search }) => {
  return axios.get(`/img/count/${myUpload}&${category}&${showData}&${search}`);
};

// gets the images
export const getImages = ({ myUpload, category, showData, search, start }) => {
  return axios.get(
    `/img/${myUpload}&${category}&${showData}&${search}&${start}`
  );
};

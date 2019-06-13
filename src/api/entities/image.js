import axios from 'axios';

// set axios timeout
axios.defaults.timeout = 3600000; 

// saves an image
export const save = info => {
  return axios.post('/img/save', info);
};

// saves images
export const saveMany = images => {
  return axios.post('/img/saveMany', images);
};

// updates an image's info
export const update = info => {
  return axios.put('/img/update', info);
};

// analyzes an image
export const analyze = file => {
  return axios.post('/img/analyze', file);
};

// segments an image
export const segment = file => {
  return axios.post('/img/segment', file);
};

// gets the total number of pages for pagination
export const countPages = ({
  myUpload,
  category,
  showData,
  search,
  folder_id
}) => {
  return axios.get(
    `/img/count/${myUpload}&${category}&${showData}&${search}&${folder_id}`
  );
};

// gets the images
export const getImages = ({
  myUpload,
  category,
  showData,
  search,
  folder_id,
  start
}) => {
  return axios.get(
    `/img/${myUpload}&${category}&${showData}&${search}&${folder_id}&${start}`
  );
};

export const getAllImages = ({id}) => {
  return axios.get(`/img/all/${id}`);
};

// archives an image
export const archiveImg = id => {
  return axios.put(`/img/archive`, id);
};

// unarchives an image
export const unarchiveImg = id => {
  return axios.put(`/img/unarchive`, id);
};

// gets an image
export const getImage = id => {
  return axios.get(`/img/view/${id}`);
};

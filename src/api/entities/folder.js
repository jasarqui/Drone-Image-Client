import axios from 'axios';

// set axios timeout
axios.defaults.timeout = 3600000; 

// creates a folder
export const addFolder = info => {
  return axios.post('/folder/add', info);
};

// edits a folder
export const editFolder = info => {
  return axios.put('/folder/edit', info);
};

// edits folder files only
export const editFiles = info => {
  return axios.put('/folder/files/edit', info);
};

// gets the total number of folder pages for pagination
export const countFolderPages = ({ myUpload, category, showData, search }) => {
  return axios.get(
    `/folder/count/${myUpload}&${category}&${showData}&${search}`
  );
};

// gets the folders
export const getFolders = ({ myUpload, category, showData, search, start }) => {
  return axios.get(
    `/folder/${myUpload}&${category}&${showData}&${search}&${start}`
  );
};

// get all folders for dropdown
export const getAllFolders = () => {
  return axios.get('/folder/all');
};

// get a folder
export const getFolder = ({ id }) => {
  return axios.get(`folder/${id}`);
};

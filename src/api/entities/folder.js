import axios from 'axios';

// creates a folder
export const addFolder = info => {
  return axios.post('/folder/add', info);
};

// edits a folder
export const editFolder = info => {
  return axios.put('/folder/edit', info);
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

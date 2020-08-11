import axios from 'axios';
import {customHistory} from '../helpers/history';
export const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export const axiosG = axios.create({baseURL: `${host}`});

axiosG.interceptors.request.use(
  req => {
    req.headers.token = localStorage.getItem('access_token');
    return req;
  },
  error => console.log('Error from interceptors request ', error),
);

axiosG.interceptors.response.use(null, error => {
  if (error.response.status === 401 || 400) {
    localStorage.clear();
    customHistory.push('/login');
  }

  return Promise.reject();
});

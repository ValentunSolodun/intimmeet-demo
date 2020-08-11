import axios from 'axios';
import {axiosG} from '../config/axios';
import {host} from '../config/axios';

export const login = async (login, password) => {
  return await axios.post(`${host}/api/login`, {login, password});
};

export const getUsers = async () => {
  return await axiosG.get(`api/users`);
};

export const getUser = async (userId) => {
  return await axiosG.get(`api/users/${userId}`);
};

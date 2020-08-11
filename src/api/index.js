import axios from 'axios';

let host = 'http://localhost:3001';

if (process.env.NODE_ENV === 'production') {
  host = '';
}


export const getUsers = async () => {
  return await axios.get(`${host}/api/users`);
};

export const getUser = async ({userId}) => {
  return await axios.get(`${host}/api/users/${userId}`);
};

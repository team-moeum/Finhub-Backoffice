import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '../utils/storage';
// import { client } from './client';

const login = async (email: string, password: string) => {
  // const response = await client.post('auth/login', {
  //   email,
  //   password,
  // });
  // return response;

  console.log({
    email,
    password,
  });

  setStorageItem('access-token', new Date().getTime().toString());
};

const verifyToken = async () => {
  // const response = await client.post('auth/verifyToken', {});
  // return response !== null;

  const accessTime = Number(getStorageItem('access-token') ?? '0');
  return new Date().getTime() - accessTime < 1000 * 60 * 30;
};

const logout = () => {
  removeStorageItem('access-token');
};

export const authAPI = {
  login,
  verifyToken,
  logout,
};

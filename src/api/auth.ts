import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '../utils/storage';
import { ApiResposne, client } from './client';

const login = async (email: string, password: string) => {
  const response: ApiResposne = await client.post('auth/login', {
    email,
    password,
  });

  setStorageItem(
    'access-token',
    response.status === 'SUCCESS' ? new Date().getTime().toString() : '0',
  );
};

const verifyToken = async () => {
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

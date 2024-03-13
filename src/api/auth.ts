import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '../utils/storage';
import { ApiResposne, client } from './client';

const EXPIRED_TIME = 1000 * 60 * 30;

const login = async (email: string, password: string) => {
  const response: ApiResposne = await client.post('/login', {
    email,
    password,
  });

  const cur = new Date().getTime();

  setStorageItem(
    'access-token',
    response.status === 'SUCCESS'
      ? cur.toString()
      : (cur + EXPIRED_TIME).toString(),
  );
};

const verifyToken = async () => {
  const accessTime = Number(getStorageItem('access-token') ?? '0');
  return new Date().getTime() - accessTime < EXPIRED_TIME;
};

const logout = () => {
  removeStorageItem('access-token');
};

export const authAPI = {
  login,
  verifyToken,
  logout,
};

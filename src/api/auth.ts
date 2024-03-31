import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@finhub/utils/storage';
import { ApiResposne, client } from '@finhub/api/client';

const login = async (email: string, password: string) => {
  const response: ApiResposne = await client.post('/admin/login', {
    email,
    password,
  });

  setLocalStorageItem('accessToken', response.data.accessToken ?? '');
  setLocalStorageItem('refreshToken', response.data.refreshToken ?? '');
};

const verifyToken = async () => {
  const response: ApiResposne = await client.post('/auth/autoLogin', {
    accessToken: getLocalStorageItem('accessToken'),
    refreshToken: getLocalStorageItem('refreshToken'),
  });

  return response.status === 'SUCCESS';
};

const logout = () => {
  removeLocalStorageItem('accessToken');
  removeLocalStorageItem('refreshToken');
};

export const authAPI = {
  login,
  verifyToken,
  logout,
};

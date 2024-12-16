import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@finhub/utils/storage';
import { ApiResposne, client } from '@finhub/api/client';

const login = async (email: string, password: string) => {
  const response: ApiResposne = await client.post('/admin/login', {
    email,
    password,
  });

  setLocalStorageItem('roleType', response.data.roleType ?? '');
  setLocalStorageItem('accessToken', response.data.token.accessToken ?? '');
  setLocalStorageItem('refreshToken', response.data.token.refreshToken ?? '');
};

const verifyToken = async () => {
  const response: ApiResposne = await client.get('/admin/autoLogin');

  return response.status === 'SUCCESS';
};

const logout = () => {
  removeLocalStorageItem('accessToken');
  removeLocalStorageItem('refreshToken');
  removeLocalStorageItem('roleType');
};

export const authAPI = {
  login,
  verifyToken,
  logout,
};

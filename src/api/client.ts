import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@finhub/utils/storage';
import { FilePathType } from '@finhub/types/FileType';
import { message } from 'antd';

const prefix = '/api/v1';
const baseURL = (import.meta.env.VITE_API_BASE_URL ?? '') + prefix;

export interface ApiResposne {
  status: 'SUCCESS' | 'FAIL';
  errorMsg?: string;
  data?: any;
}

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    finhub: import.meta.env.VITE_API_API_KEY ?? '',
    Authorization: `Bearer ${getLocalStorageItem('accessToken')}`,
    refreshToken: getLocalStorageItem('refreshToken'),
  },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<any>) => {
    if (error.response?.status === 403) {
      const response: ApiResposne = await client.get('/auth/updateAccessToken');
      if (response.status === 'SUCCESS') {
        instance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        setLocalStorageItem('accessToken', response.data.token ?? '');
        return;
      } else {
        message.error(`${error.response?.data.errorMsg || error.message}`);
        removeLocalStorageItem('accessToken');
        removeLocalStorageItem('refreshToken');
        removeLocalStorageItem('roleType');
        window.location.reload();
        return;
      }
    }

    const errorMessage: string = error.response?.data.errorMsg || error.message;
    message.error(`${errorMessage}`);
    return Promise.reject(error);
  },
);

export interface FetchInstance {
  get: <Response = unknown>(url: string) => Promise<Response>;
  post: <Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) => Promise<Response>;
  put: <Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) => Promise<Response>;
  delete: <Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) => Promise<Response>;
  upload: <Response = unknown>(
    url: string,
    type: FilePathType,
    file: File,
  ) => Promise<Response>;
}

export const client: FetchInstance = {
  get: async function fetch<Response = unknown>(url: string) {
    const res = await instance.get<Response>(url);
    return res.data;
  },
  post: async function fetch<Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) {
    const res = await instance.post<Response>(url, body);
    return res.data;
  },
  put: async function fetch<Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) {
    const res = await instance.put<Response>(url, body);
    return res.data;
  },
  delete: async function fetch<Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) {
    const res = await instance.delete<Response>(url, { data: body });
    return res.data;
  },
  upload: async function fetch<Response = unknown>(
    url: string,
    type: FilePathType,
    file: File,
  ) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const res = await instance.post<Response>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },
};

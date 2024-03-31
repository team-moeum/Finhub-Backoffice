/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getLocalStorageItem } from '@finhub/utils/storage';
import { FilePathType } from '@finhub/types/FileType';

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
  delete: <Response = unknown>(url: string) => Promise<Response>;
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
  delete: async function fetch<Response = unknown>(url: string) {
    const res = await instance.delete<Response>(url);
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

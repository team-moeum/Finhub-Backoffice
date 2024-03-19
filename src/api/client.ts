/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getLocalStorageItem, getStorageItem } from '../utils/storage';

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
    accessToken: getStorageItem('accessToken'),
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
};

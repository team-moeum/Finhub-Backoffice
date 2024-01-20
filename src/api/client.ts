/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = process.env.VITE_API_BASE_URL || '';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FetchInstance {
  get: <Response = unknown>(url: string) => Promise<Response>;
  post: <Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) => Promise<Response>;
  patch: <Response = unknown>(
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
  patch: async function fetch<Response = unknown>(
    url: string,
    body: { [key: string]: any },
  ) {
    const res = await instance.patch<Response>(url, body);
    return res.data;
  },
  delete: async function fetch<Response = unknown>(url: string) {
    const res = await instance.delete<Response>(url);
    return res.data;
  },
};

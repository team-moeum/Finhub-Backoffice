import { http, HttpResponse } from 'msw';

const prefix = '/api/v1/admin/auth';

export const authHandler = [
  http.post(`${prefix}/login`, () =>
    HttpResponse.json({
      status: 'SUCCESS',
    }),
  ),
];

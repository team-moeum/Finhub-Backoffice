import { http, HttpResponse } from 'msw';

const prefix = '/api/v1';

const login: Parameters<typeof http.post>[1] = () => {
  return HttpResponse.json(
    {
      status: 'SUCCESS',
      data: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      },
    },
    { status: 200 },
  );
};

const autoLogin: Parameters<typeof http.post>[1] = async ({ request }) => {
  const body = (await request.json()) as any;

  if (body.accessToken) {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
      },
      { status: 200 },
    );
  }

  return HttpResponse.json(
    {
      status: 'FAIL',
    },
    { status: 500 },
  );
};

export const authHandler = [
  http.post(`${prefix}/admin/login`, login),
  http.post(`${prefix}/auth/autoLogin`, autoLogin),
];

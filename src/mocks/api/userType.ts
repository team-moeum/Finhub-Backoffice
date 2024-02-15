import { http, HttpResponse } from 'msw';

const mockData = [
  {
    id: 1,
    name: '디자이너',
    avatarImgPath: '/logo.svg',
    useYN: 'N',
  },
  {
    id: 2,
    name: 'PM',
    avatarImgPath: '/logo.svg',
    useYN: 'Y',
  },
  {
    id: 3,
    name: '개발자',
    avatarImgPath: '/logo.svg',
    useYN: 'N',
  },
];

const prefix = '/api/v1/admin/usertype';

export const usertypeHandler = [
  // usertype 전체 조회
  http.get(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          usertypeList: mockData,
        },
      },
      { status: 200 },
    );
  }),

  // usertype 상세 조회
  http.get(`${prefix}/:id`, ({ params }) => {
    const { id } = params;

    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          id,
          name: '디자이너',
          avatarImgPath: '/logo.svg',
          useYN: 'N',
        },
      },
      { status: 200 },
    );
  }),

  // usertype 생성
  http.post(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          id: 4,
        },
      },
      { status: 200 },
    );
  }),

  // usertype 수정
  http.put(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
      },
      { status: 200 },
    );
  }),
];

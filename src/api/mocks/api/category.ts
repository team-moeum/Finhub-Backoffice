import { http, HttpResponse } from 'msw';

export const mockData = [
  {
    id: 1,
    name: 'ETF',
    thumbnailImgPath: '/logo.svg',
    useYN: 'Y',
  },
  {
    id: 2,
    name: 'FUND',
    thumbnailImgPath: '/logo.svg',
    useYN: 'N',
  },
  {
    id: 3,
    name: 'IRP',
    thumbnailImgPath: '/logo.svg',
    useYN: 'N',
  },
];

const prefix = '/api/v1/admin/category';

export const categoryHandler = [
  // Category 전체 조회
  http.get(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          categoryList: mockData,
        },
      },
      { status: 200 },
    );
  }),

  // Category 상세 조회
  http.get(`${prefix}/:id`, ({ params }) => {
    const { id } = params;

    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          categoryId: id,
          name: 'ETF',
          thumbnailImgPath: '/logo.svg',
          useYN: 'Y',
          topicList: [
            {
              id: 1,
              title: '주식이란?',
              categoryId: 1,
            },
            {
              id: 5,
              title: '펀드란?',
              categoryId: 1,
            },
            {
              id: 6,
              title: '크크크2',
              categoryId: 1,
            },
          ],
        },
      },
      { status: 200 },
    );
  }),

  // Category 생성
  http.post(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          id: 4,
        },
      },
      { status: 201 },
    );
  }),

  // Category 수정
  http.put(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
      },
      { status: 200 },
    );
  }),
];

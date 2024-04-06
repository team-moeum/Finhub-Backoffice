import { http, HttpResponse } from 'msw';

const mockData = [
  {
    topicId: 1,
    title: 'ETF란',
    categoryId: 1,
    categoryName: 'ETF',
    useYN: 'Y',
    thumbnail: '/logo.png',
  },
  {
    topicId: 2,
    title: 'FUND란',
    categoryId: 2,
    categoryName: 'FUND',
    useYN: 'N',
    thumbnail: '/logo.png',
  },
  {
    topicId: 3,
    title: 'IRP란',
    categoryId: 3,
    categoryName: 'IRP',
    useYN: 'Y',
    thumbnail: '/logo.png',
  },
];

const prefix = '/api/v1/admin/topic';

export const topicHandler = [
  // Topic 전체 조회
  http.get(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          topicList: mockData,
        },
      },
      { status: 200 },
    );
  }),

  // Topic 상세 조회
  http.get(`${prefix}/:id`, ({ params }) => {
    const { id } = params;

    return HttpResponse.json(
      {
        status: 'SUCCESS',
        data: {
          topicId: id,
          title: 'ETF란',
          definition: '펀드란 어떤 것을 사고파는 행위이다.',
          shortDefinition: '펀드란 사고파는 것.',
          categoryId: 1,
          useYN: 'Y',
          thumbnailImgPath: '/logo.png',
          gptList: [
            {
              usertypeId: 1,
              usertypeName: '디자이너',
              avatarImgPath: '/logo.png',
              gptId: 1,
              content: '이것은 GPT 컨텐츠입니다 이것은 디자이너입니다',
              useYN: 'Y',
            },
            {
              usertypeId: 2,
              usertypeName: '개발자',
              avatarImgPath: '/logo.png',
              gptId: 2,
              content: '이것은 GPT 컨텐츠입니다 이것은 개발자입니다',
              useYN: 'Y',
            },
            {
              usertypeId: 3,
              usertypeName: '기획자',
              avatarImgPath: '/logo.png',
              gptId: 3,
              content: '이것은 GPT 컨텐츠입니다 이것은 기획자입니다',
              useYN: 'Y',
            },
          ],
        },
      },
      { status: 200 },
    );
  }),

  // Topic 생성
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

  // Topic 수정
  http.put(`${prefix}`, () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
      },
      { status: 200 },
    );
  }),
];

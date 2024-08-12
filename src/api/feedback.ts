import { FeedbackType } from '@finhub/types/Feedback';
import { ApiResposne, client } from './client';

const prefix = '/admin/feedback';

const list = async ({
  page,
  listSize,
  reply,
}: {
  page: number;
  listSize: number;
  reply: string;
}) => {
  let url = `${prefix}?page=${page}&size=${listSize}`;
  if (reply !== '전체') {
    url += `&reply=${reply}`;
  }
  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    vocList: FeedbackType[];
    pageInfo: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalElements: number;
    };
  } = response.data;

  return {
    list: dataSource.vocList,
    totalDocuments: dataSource.pageInfo.totalElements,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`${prefix}/${id}`);
  const dataSource = response.data;
  return dataSource.vocDetail;
};

const send = async ({ id, text }: { id: number; text: string }) => {
  const response: ApiResposne = await client.post(`${prefix}`, { id, text });
  const dataSource = response.data;
  return dataSource;
};

export const feedbackAPI = {
  list,
  show,
  send,
};

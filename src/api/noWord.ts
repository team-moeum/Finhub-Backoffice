import { INoWord } from '@finhub/types/NoWord';
import { IPageInfo } from '@finhub/types/PageInfo';
import { ApiResposne, client } from './client';

const list = async ({
  page,
  listSize,
  resolvedYN,
}: {
  page: number;
  listSize: number;
  resolvedYN: string;
}) => {
  let url = `/admin/no-word?page=${page}&size=${listSize}`;
  if (resolvedYN !== '전체') {
    url += `&resolvedYN=${resolvedYN}`;
  }
  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    topicRequestList: INoWord[];
    pageInfo: IPageInfo;
  } = response.data;

  return {
    list: dataSource.topicRequestList,
    totalDocuments: dataSource.pageInfo.totalElements,
  };
};

const update = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.post('/no-word', {
    id,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;
  return dataSource;
};

export const noWordAPI = {
  list,
  update,
};

import { INoWord } from '../types/NoWord';
import { IPageInfo } from '../types/PageInfo';
import { ApiResposne, client } from './client';

const list = async ({
  page,
  listSize,
  keyword,
  resolvedYN,
}: {
  page: number;
  listSize: number;
  keyword: string;
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

  const currentPage = page ?? 1;

  const origin =
    resolvedYN === '전체'
      ? dataSource.topicRequestList
      : dataSource.topicRequestList.filter(
          (item) => item.resolvedYN === resolvedYN,
        );

  const data = origin.slice(
    (currentPage - 1) * listSize,
    currentPage * listSize,
  );

  return {
    list: data.filter((item) => item.term.includes(keyword)),
    totalDocuments: dataSource.topicRequestList.length,
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

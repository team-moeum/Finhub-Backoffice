import { IUsertype } from '../types/UserType';
import { ApiResposne, client } from './client';

const list = async ({
  page,
  listSize,
  keyword,
  useYN,
}: {
  page: number;
  listSize: number;
  keyword: string;
  useYN: string;
}) => {
  let url = '/usertype';
  if (useYN !== '전체') {
    url += `?useYN=${useYN}`;
  }
  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    usertypeList: IUsertype[];
  } = response.data;

  const currentPage = page ?? 1;
  const origin =
    useYN === '전체'
      ? dataSource.usertypeList
      : dataSource.usertypeList.filter((item) => item.useYN === useYN);

  const data = origin.slice(
    (currentPage - 1) * listSize,
    currentPage * listSize,
  );

  return {
    list: data.filter((item) => item.name.includes(keyword)),
    totalDocuments: dataSource.usertypeList.length,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`/usertype/${id}`);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({ name }: { name: string }) => {
  const response: ApiResposne = await client.post('/usertype', {
    name,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const update = async ({
  id,
  name,
  useYN,
}: {
  id: number;
  name: string;
  useYN: boolean;
}) => {
  const response: ApiResposne = await client.put('/usertype', {
    id,
    name,
    useYN: useYN ? 'Y' : 'N',
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

export const usertypeAPI = {
  list,
  show,
  create,
  update,
};

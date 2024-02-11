import { ICategory } from '../types/Category';
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
  const response: ApiResposne = await client.get('/category');

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    categoryList: ICategory[];
  } = response.data;

  const currentPage = page ?? 1;
  const origin =
    useYN === '전체'
      ? dataSource.categoryList
      : dataSource.categoryList.filter((item) => item.useYN === useYN);

  const data = origin.slice(
    (currentPage - 1) * listSize,
    currentPage * listSize,
  );

  return {
    list: data.filter((item) => item.name.includes(keyword)),
    totalDocuments: dataSource.categoryList.length,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`category/${id}`);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({
  name,
  useYN,
  thumbnailImgPath,
}: {
  name: string;
  useYN: boolean;
  thumbnailImgPath: string;
}) => {
  const response: ApiResposne = await client.post('/category', {
    name,
    useYN,
    thumbnailImgPath,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource: ICategory = response.data;

  return dataSource;
};

const update = async ({
  id,
  name,
  thumbnailImgPath,
  useYN,
  topicList,
}: {
  id: number;
  name: string;
  thumbnailImgPath: string;
  useYN: boolean;
  topicList: { id: number; title: string; categoryId: number }[];
}) => {
  const response: ApiResposne = await client.put('/category', {
    id,
    name,
    useYN,
    thumbnailImgPath,
    topicList,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource: ICategory = response.data;

  return dataSource;
};

export const categoryAPI = {
  list,
  show,
  create,
  update,
};

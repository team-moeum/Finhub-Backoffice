import { ITopic } from '../types/Topic';
import { ApiResposne, client } from './client';

const list = async ({
  page,
  listSize,
  keyword,
  category,
  useYN,
}: {
  page: number;
  listSize: number;
  keyword: string;
  category: string;
  useYN: string;
}) => {
  let url = `/admin/topic?page=${page}&size=${listSize}`;
  if (useYN !== '전체') {
    url += `&useYN=${useYN}`;
  }
  if (category) {
    url += `&categoryId=${category}`;
  }
  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    topicList: ITopic[];
  } = response.data;

  const currentPage = page ?? 1;

  let origin =
    category === '전체'
      ? dataSource.topicList
      : dataSource.topicList.filter((item) => item.categoryName === category);
  origin =
    useYN === '전체' ? origin : origin.filter((item) => item.useYN === useYN);

  const data = origin.slice(
    (currentPage - 1) * listSize,
    currentPage * listSize,
  );

  return {
    list: data.filter((item) => item.title.includes(keyword)),
    totalDocuments: dataSource.topicList.length,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`/admin/topic/${id}`);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({
  title,
  definition,
  shortDefinition,
  thumbnailImgPath,
  categoryId,
  useYN,
}: {
  title: string;
  definition: string;
  shortDefinition: string;
  thumbnailImgPath: string;
  categoryId: number;
  useYN: boolean;
}) => {
  const response: ApiResposne = await client.post('/admin/topic', {
    title,
    definition,
    shortDefinition,
    thumbnailImgPath,
    categoryId,
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

const update = async ({
  topicId,
  title,
  definition,
  shortDefinition,
  categoryId,
  thumbnailImgPath,
  gptList,
  useYN,
}: {
  topicId: number;
  title: string;
  definition: string;
  shortDefinition: string;
  categoryId: number;
  thumbnailImgPath: string;
  gptList: {
    gptId: number;
    content: string;
    useYN: string;
  }[];
  useYN: boolean;
}) => {
  const response: ApiResposne = await client.put('/admin/topic', {
    topicId,
    title,
    definition,
    shortDefinition,
    thumbnailImgPath,
    categoryId,
    gptList,
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

export const topicAPI = {
  list,
  show,
  create,
  update,
};

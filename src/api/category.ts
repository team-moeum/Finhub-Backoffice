import { ApiResposne, client } from '@finhub/api/client';
import { ICategory } from '@finhub/types/Category';
import { commonAPI } from '@finhub/api/common';

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
  let url = `/admin/category?page=${page}&size=${listSize}`;
  if (useYN !== '전체') {
    url += `&useYN=${useYN}`;
  }
  const response: ApiResposne = await client.get(url);

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
  const response: ApiResposne = await client.get(`/admin/category/${id}`);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({
  file,
  name,
}: {
  file?: any;
  name: string;
}): Promise<{
  id?: number;
  errorMsg?: string;
}> => {
  const data: {
    s3ImgUrl?: string;
    errorMsg?: string;
  } = await commonAPI.saveImg(file, 'category');

  const response: ApiResposne = await client.post('/admin/category', {
    name,
    s3ImgUrl: data.s3ImgUrl,
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
  file,
  id,
  name,
  useYN,
  topicList,
  s3ImgUrl,
}: {
  file?: any;
  id: number;
  name: string;
  useYN: boolean;
  topicList: { id: number; title: string; categoryId: number }[];
  s3ImgUrl: string;
}) => {
  const params = {
    id,
    name,
    useYN: useYN ? 'Y' : 'N',
    topicList,
    s3ImgUrl,
  };

  if (typeof file !== 'string') {
    const data: {
      s3ImgUrl?: string;
      errorMsg?: string;
    } = await commonAPI.saveImg(file, 'category');

    params['s3ImgUrl'] = data.s3ImgUrl ?? '';
  }

  const response: ApiResposne = await client.put('/admin/category', params);

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

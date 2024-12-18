import { ApiResposne, client } from '@finhub/api/client';
import { ICategory } from '@finhub/types/Category';
import { commonAPI } from '@finhub/api/common';

const list = async ({
  page,
  listSize,
  useYN,
}: {
  page: number;
  listSize: number;
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
    pageInfo: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalElements: number;
    };
  } = response.data;

  return {
    list: dataSource.categoryList,
    totalDocuments: dataSource.pageInfo.totalElements,
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
  } = file ? await commonAPI.saveImg(file, 'category') : {};

  if (file && !data.s3ImgUrl) {
    return { errorMsg: data.errorMsg || '이미지 업로드 실패' };
  }

  const response: ApiResposne = await client.post('/admin/category', {
    name,
    s3ImgUrl: data.s3ImgUrl ?? '',
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
    topicList: topicList.map(({ id, title, categoryId }) => ({
      topicId: id,
      title,
      categoryId,
    })),
    s3ImgUrl,
  };

  if (file && typeof file !== 'string') {
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

const remove = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.delete('/admin/category', { id });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const updateOrder = async ({
  orders,
}: {
  orders: { [key: string]: number };
}) => {
  const response: ApiResposne = await client.post('/admin/order/category', {
    orders,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

export const categoryAPI = {
  list,
  show,
  create,
  update,
  remove,
  updateOrder,
};

import { IUsertype } from '../types/UserType';
import { ApiResposne, client } from './client';
import { commonAPI } from './common';

const list = async ({
  page,
  listSize,
  useYN,
}: {
  page: number;
  listSize: number;
  useYN: string;
}) => {
  let url = `/admin/usertype?page=${page}&size=${listSize}`;
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
    usertypeList: IUsertype[];
    pageInfo: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalElements: number;
    };
  } = response.data;

  return {
    list: dataSource.usertypeList,
    totalDocuments: dataSource.pageInfo.totalElements,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`/admin/usertype/${id}`);
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

  const response: ApiResposne = await client.post('/admin/usertype', {
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
  id,
  name,
  useYN,
  s3ImgUrl,
  file,
}: {
  id: number;
  name: string;
  useYN: boolean;
  file?: any;
  s3ImgUrl: string;
}) => {
  const params = {
    id,
    name,
    useYN: useYN ? 'Y' : 'N',
    s3ImgUrl,
  };

  if (file && typeof file !== 'string') {
    const data: {
      s3ImgUrl?: string;
      errorMsg?: string;
    } = await commonAPI.saveImg(file, 'category');

    params['s3ImgUrl'] = data.s3ImgUrl ?? '';
  }

  const response: ApiResposne = await client.put('/admin/usertype', params);

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const remove = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.delete('/admin/usertype', { id });

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
  remove,
};

import { ApiResposne, client } from '@finhub/api/client';
import { IBanner } from '@finhub/types/Banner';
import { IPageInfo } from '@finhub/types/PageInfo';
import { commonAPI } from './common';

const prefix = '/admin/banner';

const list = async ({
  page,
  listSize,
  useYN,
}: {
  page: number;
  listSize: number;
  useYN: string;
}): Promise<{
  list: IBanner[];
  totalDocuments: number;
}> => {
  let url = `${prefix}?page=${page}&size=${listSize}`;
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
    bannerList: IBanner[];
    pageInfo: IPageInfo;
  } = response.data;

  return {
    list: dataSource.bannerList,
    totalDocuments: dataSource.pageInfo.totalElements,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`${prefix}/${id}`);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({
  title,
  subTitle,
  landingPageUrl,
  bannerType,
  useYN,
  file,
}: {
  title: string;
  subTitle: string;
  landingPageUrl: string;
  bannerType: string;
  useYN: string;
  file: any;
}): Promise<{
  id?: number;
  errorMsg?: string;
}> => {
  const data: {
    s3ImgUrl?: string;
    errorMsg?: string;
  } = file ? await commonAPI.saveImg(file, 'banner') : {};

  if (file && !data.s3ImgUrl) {
    return { errorMsg: data.errorMsg || '이미지 업로드 실패' };
  }

  const response: ApiResposne = await client.post(prefix, {
    title,
    subTitle,
    landingPageUrl,
    bannerType,
    s3ImgUrl: data.s3ImgUrl ?? '',
    useYN,
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
  title,
  subTitle,
  landingPageUrl,
  bannerType,
  s3ImgUrl,
  useYN,
  file,
}: {
  id: number;
  title: string;
  subTitle: string;
  landingPageUrl: string;
  bannerType: string;
  s3ImgUrl: string;
  useYN: string;
  file: any;
}) => {
  const params = {
    id,
    title,
    subTitle,
    landingPageUrl,
    bannerType,
    s3ImgUrl,
    useYN,
  };

  if (file && typeof file !== 'string') {
    const data: {
      s3ImgUrl?: string;
      errorMsg?: string;
    } = await commonAPI.saveImg(file, 'banner');

    params['s3ImgUrl'] = data.s3ImgUrl ?? '';
  }

  const response: ApiResposne = await client.put(prefix, params);

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const remove = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.delete(prefix, { id });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

export const bannerAPI = {
  list,
  show,
  create,
  update,
  remove,
};

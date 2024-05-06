import { ApiResposne, client } from '@finhub/api/client';
import { IColumnListItem } from '@finhub/types/Column';
import { commonAPI } from './common';

const prefix = '/admin/gpt-column';

const list = async (): Promise<{
  list: IColumnListItem[];
}> => {
  const response: ApiResposne = await client.get(prefix);

  if (response.status === 'FAIL') {
    return {
      list: [],
    };
  }

  const dataSource: {
    gptColumns: IColumnListItem[];
  } = response.data;

  return {
    list: dataSource.gptColumns,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`${prefix}/${id}`);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({
  title,
  summary,
  content,
  topicList,
  file,
}: {
  title: string;
  summary: string;
  content: string;
  bannerType: string;
  topicList: number[];
  file: any;
}): Promise<{
  id?: number;
  errorMsg?: string;
}> => {
  const data: {
    s3ImgUrl?: string;
    errorMsg?: string;
  } = file ? await commonAPI.saveImg(file, 'column') : {};

  if (file && !data.s3ImgUrl) {
    return { errorMsg: data.errorMsg || '이미지 업로드 실패' };
  }

  const response: ApiResposne = await client.post(prefix, {
    title,
    summary,
    content,
    backgroundUrl: data.s3ImgUrl ?? '',
    useYN: 'N',
    topicList,
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
  summary,
  content,
  backgroundUrl,
  useYN,
  topicList,
  file,
}: {
  id: number;
  title: string;
  summary: string;
  content: string;
  backgroundUrl: string;
  useYN: string;
  topicList: number[];
  file: any;
}) => {
  const params = {
    id,
    title,
    summary,
    content,
    backgroundUrl,
    useYN,
    topicList,
  };

  if (file && typeof file !== 'string') {
    const data: {
      s3ImgUrl?: string;
      errorMsg?: string;
    } = await commonAPI.saveImg(file, 'banner');

    params['backgroundUrl'] = data.s3ImgUrl ?? '';
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

export const columnAPI = {
  list,
  show,
  create,
  update,
  remove,
};

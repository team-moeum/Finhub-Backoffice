import { ApiResposne, client } from '@finhub/api/client';
import { IAnnounce } from '@finhub/types/Announce';
import { IPageInfo } from '@finhub/types/PageInfo';

const prefix = '/admin/announce';

const list = async ({
  page,
  listSize,
}: {
  page: number;
  listSize: number;
}): Promise<{
  list: IAnnounce[];
  totalDocuments: number;
}> => {
  const url = `${prefix}?page=${page}&size=${listSize}`;
  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    info: IAnnounce[];
    pageInfoProcessDto: IPageInfo;
  } = response.data;

  return {
    list: dataSource.info,
    totalDocuments: dataSource.pageInfoProcessDto.totalElements,
  };
};

const show = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.get(`${prefix}/${id}`);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}): Promise<{
  id?: number;
  errorMsg?: string;
}> => {
  const response: ApiResposne = await client.post(prefix, {
    title,
    content,
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
  content,
}: {
  id: number;
  title: string;
  content: string;
}) => {
  const params = {
    id,
    title,
    content,
  };

  const response: ApiResposne = await client.put(prefix, params);

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource: IAnnounce = response.data;

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

export const announceAPI = {
  list,
  show,
  create,
  update,
  remove,
};

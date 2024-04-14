import { IGptLog } from '../types/GptLog';
import { IPageInfo } from '../types/PageInfo';
import { ApiResposne, client } from './client';

const list = async ({
  topicId,
  usertypeId,
}: {
  topicId: number;
  usertypeId: number;
}) => {
  const url = `/admin/gpt-log?page=1&size=999&topicId=${topicId}&usertypeId=${usertypeId}`;
  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    gptLogList: IGptLog[];
    pageInfo: IPageInfo;
  } = response.data;

  return {
    list: dataSource.gptLogList,
    totalDocuments: dataSource.gptLogList.length,
  };
};

export const gptLogAPI = {
  list,
};

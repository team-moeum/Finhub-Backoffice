import { ApiResposne, client } from '@finhub/api/client';
import { IColumnListItem } from '@finhub/types/Column';
import { commonAPI } from './common';
import { ICommentReport } from '@finhub/types/CommentReport';

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
  const response: ApiResposne = await client.delete('/admin/column', { id });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const generateSummary = async ({ title }: { title: string }) => {
  const response: ApiResposne = await client.post(`${prefix}/summary`, {
    subject: title,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const generateContent = async ({ title }: { title: string }) => {
  const response: ApiResposne = await client.post(`${prefix}/content`, {
    subject: title,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const reportReason = async () => {
  const response: ApiResposne = await client.get('/admin/report/reason');

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const createReportReason = async ({ reason }: { reason: string }) => {
  const response: ApiResposne = await client.post('/admin/report/reason', {
    reason,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const updateReportReason = async ({
  id,
  reason,
  useYn,
}: {
  id: number;
  reason: string;
  useYn: string;
}) => {
  const response: ApiResposne = await client.put('/admin/report/reason', {
    id,
    reason,
    useYN: useYn,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const confirmComment = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.post('/admin/report/comment', {
    id,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const listCommentReport = async ({
  page,
  listSize,
  useYn,
}: {
  page: number;
  listSize: number;
  useYn: string;
}) => {
  let url = `/admin/report/comment?page=${page}&size=${listSize}`;
  if (useYn !== '전체') {
    url += `&useYN=${useYn}`;
  }
  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      list: [],
      totalDocuments: 0,
    };
  }

  const dataSource: {
    reportedCommentsList: ICommentReport[];
    pageInfo: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalElements: number;
    };
  } = response.data;

  return {
    list: dataSource.reportedCommentsList,
    totalDocuments: dataSource.pageInfo.totalElements,
  };
};

export const columnAPI = {
  list,
  show,
  create,
  update,
  remove,
  generateSummary,
  generateContent,
  reportReason,
  createReportReason,
  updateReportReason,
  confirmComment,
  listCommentReport,
};

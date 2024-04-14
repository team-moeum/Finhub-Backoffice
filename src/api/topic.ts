import { ITopic } from '@finhub/types/Topic';
import { ApiResposne, client } from './client';
import { commonAPI } from './common';

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
  category?: number;
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

  const origin =
    useYN === '전체'
      ? dataSource.topicList
      : dataSource.topicList.filter((item) => item.useYN === useYN);

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
  file,
  title,
  definition,
  categoryId,
  useYN,
}: {
  file?: any;
  title: string;
  definition: string;
  categoryId: number;
  useYN: boolean;
}) => {
  const data: {
    s3ImgUrl?: string;
    errorMsg?: string;
  } = file ? await commonAPI.saveImg(file, 'topic') : {};

  if (file && !data.s3ImgUrl) {
    return { errorMsg: data.errorMsg || '이미지 업로드 실패' };
  }

  const response: ApiResposne = await client.post('/admin/topic', {
    title,
    definition,
    categoryId,
    useYN: useYN ? 'Y' : 'N',
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
  topicId,
  title,
  definition,
  categoryId,
  summary,
  s3ImgUrl,
  file,
  gptList,
  useYN,
}: {
  file?: any;
  topicId: number;
  title: string;
  definition: string;
  categoryId: number;
  summary: string;
  s3ImgUrl: string;
  gptList: {
    gptId?: number;
    content: string;
    useYN: string;
  }[];
  useYN: boolean;
}) => {
  const params = {
    topicId,
    title,
    definition,
    summary,
    s3ImgUrl: s3ImgUrl ?? '',
    categoryId,
    gptList,
    useYN: useYN ? 'Y' : 'N',
  };
  if (file && typeof file !== 'string') {
    const data: {
      s3ImgUrl?: string;
      errorMsg?: string;
    } = await commonAPI.saveImg(file, 'topic');

    params['s3ImgUrl'] = data.s3ImgUrl ?? '';
  }

  const response: ApiResposne = await client.put('/admin/topic', params);

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;
  return dataSource;
};

/**
 * 토픽 유저타입 별 gpt 내용 생성 및 반환
 * @param param0
 * @returns
 */
const craeteAITopicContent = async ({
  topicId,
  categoryId,
  userTypeId,
}: {
  topicId: number;
  categoryId: number;
  userTypeId: number;
}) => {
  const response: ApiResposne = await client.post('/admin/topic-usertype', {
    topicId,
    categoryId,
    usertypeId: userTypeId,
  });

  if (response.data.status === 'FAIL') {
    return {
      errorMsg: response.data.errorMsg,
    };
  }

  const dataSource = response.data;
  return dataSource;
};

const getPrompt = async () => {
  const response: ApiResposne = await client.get('/admin/prompt');

  if (response.data.status === 'FAIL') {
    return {
      errorMsg: response.data.errorMsg,
    };
  }

  const dataSource = response.data;
  return dataSource;
};

const craetePrompt = async ({ prompt }: { prompt: string }) => {
  const response: ApiResposne = await client.post('/admin/prompt', { prompt });

  if (response.data.status === 'FAIL') {
    return {
      errorMsg: response.data.errorMsg,
    };
  }

  const dataSource = response.data;
  return dataSource;
};

const createTopicSummary = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.post('/admin/topic-summary', {
    id,
  });

  if (response.data.status === 'FAIL') {
    return {
      errorMsg: response.data.errorMsg,
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
  craeteAITopicContent,
  getPrompt,
  craetePrompt,
  createTopicSummary,
};

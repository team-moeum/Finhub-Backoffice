import { ApiResposne, client } from './client';
import { commonAPI } from './common';
import { IEmoticon } from '@finhub/types/Emoticon';

const prefix = '/admin/calendar-emoticon';

const list = async () => {
  const response: ApiResposne = await client.get(prefix);

  if (response.status === 'FAIL') {
    return {
      calendarEmoticons: [],
    };
  }

  const dataSource: {
    calendarEmoticons: IEmoticon[];
  } = response.data;

  return dataSource;
};

const create = async ({ file }: { file?: any }) => {
  const data: {
    s3ImgUrl?: string;
    errorMsg?: string;
  } = file ? await commonAPI.saveImg(file, 'emoticon') : {};

  if (file && !data.s3ImgUrl) {
    return { errorMsg: data.errorMsg || '이미지 업로드 실패' };
  }

  const response: ApiResposne = await client.post(prefix, {
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

export const emoticonAPI = {
  list,
  create,
};

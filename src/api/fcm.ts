import { ApiResposne, client } from './client';

const sendNoti = async ({
  target,
  title,
  content,
  view,
}: {
  target: string;
  title: string;
  content: string;
  view: string;
}) => {
  const response: ApiResposne = await client.post('/admin/send-noti', {
    target,
    title,
    content,
    view,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;
  return dataSource;
};

export const fcmAPI = {
  sendNoti,
};

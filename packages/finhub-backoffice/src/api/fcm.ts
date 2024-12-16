import { ApiResposne, client } from './client';

export interface SendNotiRequestType {
  type: number;
  target?: string[];
  title: string;
  content: string;
  view: string;
  action?: { [key: string]: any };
}

const sendNoti = async ({
  type,
  target,
  title,
  content,
  view,
  action = {},
}: SendNotiRequestType) => {
  const response: ApiResposne = await client.post('/admin/send-noti', {
    type,
    target,
    title,
    content,
    view,
    action,
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

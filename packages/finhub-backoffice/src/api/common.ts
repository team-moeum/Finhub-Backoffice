import { ApiResposne, client } from '@finhub/api/client';
import { FilePathType } from '@finhub/types/FileType';

// TODO
export const MAX_LIST_SIZE = 999;

const saveImg = async (file: any, type: FilePathType) => {
  const response: ApiResposne = await client.upload('/admin/img', type, file);

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource: { s3ImgUrl: string } = response.data;

  return dataSource;
};

export const commonAPI = {
  saveImg,
};

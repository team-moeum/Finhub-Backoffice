import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { usertypeAPI } from '@finhub/api/userType';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { FHSwitch } from '@finhub/components/atoms/Switch';

export const UserTypeDetailPage = () => {
  const { id } = useParams();
  const userTypeId = Number(id);
  const [name, setName] = useState('');
  const [avatarImgPath, setAvatarImgPath] = useState('');
  const [useYN, setUseYN] = useState(false);

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'name') {
        setName(value);
      }
    };

  const initRequest = async () => {
    const data = await usertypeAPI.show({
      id: userTypeId,
    });

    if (data) {
      setAvatarImgPath(data.avatarImgPath ?? './logo.png');
      setName(data.name ?? '');
      setUseYN(data.useYN === 'Y');
    }
  };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  const handleSubmit = () => {
    usertypeAPI.update({
      id: userTypeId,
      name,
      useYN,
      s3ImgUrl: avatarImgPath,
      file: avatarImgPath,
    });

    alert('반영되었습니다.');
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <CreatePageTemplate label="유저유형 수정">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="아바타">
          <FHUploader
            thumbnail={avatarImgPath}
            setThumbnail={setAvatarImgPath}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="유저유형명">
          <FHTextInput
            type="text"
            value={name}
            onChange={handleTextChange('name')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="노출여부">
          <FHSwitch value={useYN} onChange={handleUseYNChange} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          유저유형 수정
        </FHButton>
      </S.formItemWrapper>
    </CreatePageTemplate>
  );
};

const S = {
  formItemWrapper: styled.div`
    max-width: 720px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 32px;
  `,
};

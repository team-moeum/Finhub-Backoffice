import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { usertypeAPI } from '@finhub/api/userType';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { useNavigate } from 'react-router-dom';

export const UserTypeCreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [avatarImgPath, setAvatarImgPath] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'name') {
        setName(value);
      }
    };

  const handleSubmit = async () => {
    if (!name) {
      alert('유저유형명을 입력해주세요');
      return;
    }
    const data = await usertypeAPI.create({
      file: avatarImgPath,
      name,
    });

    alert('반영되었습니다.');
    navigate(`/services/usertypes/${data.id}`);
  };

  return (
    <CreatePageTemplate label="유저유형 추가">
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
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          유저유형 추가
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

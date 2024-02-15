import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { FHFormItem } from '../../components/organisms/FormItem';
import { usertypeAPI } from '../../api/userType';
import { FHUploader } from '../../components/atoms/Uploader';

export const UserTypeCreatePage = () => {
  const [name, setName] = useState('');
  const [avatarImgPath, setAvatarImgPath] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'name') {
        setName(value);
      }
    };

  const handleSubmit = () => {
    if (!name) {
      alert('유저유형명을 입력해주세요');
      return;
    }
    usertypeAPI.create({
      name,
      avatarImgPath,
    });

    alert('반영되었습니다.');
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
    width: 360px;
    margin-bottom: 32px;
  `,
};

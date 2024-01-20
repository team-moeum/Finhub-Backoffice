import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { FHFormItem } from '../../components/organisms/FormItem';
import { topicAPI } from '../../api/topic';
import { FHUploader } from '../../components/atoms/Uploader';

export const TopicCreatePage = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      }
    };

  const handleSubmit = () => {
    if (!title) {
      alert('주제명을 입력해주세요');
      return;
    }
    topicAPI.create({
      title,
      thumbnail,
    });

    alert('반영되었습니다.');
  };

  return (
    <CreatePageTemplate label="주제 추가">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="썸네일">
          <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="주제명">
          <FHTextInput
            type="text"
            value={title}
            onChange={handleTextChange('title')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          주제 추가
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

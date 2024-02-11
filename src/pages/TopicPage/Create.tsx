import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { FHFormItem } from '../../components/organisms/FormItem';
import { topicAPI } from '../../api/topic';
import { FHUploader } from '../../components/atoms/Uploader';
import { FHSelect } from '../../components/atoms/Select';
import { FHSwitch } from '../../components/atoms/Switch';
import { ICategory } from '../../types/Category';
import { categoryAPI } from '../../api/category';

export const TopicCreatePage = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('ETF');
  const [useYN, setUseYN] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

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
      category,
      thumbnail,
      useYN,
    });

    alert('반영되었습니다.');
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  const initRequest = async () => {
    const listData = await categoryAPI.list({
      page: 1,
      listSize: 20,
      keyword: '',
      useYN: '',
    });
    setCategories(listData.list);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <CreatePageTemplate label="주제 추가">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="썸네일">
          <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="카테고리">
          <FHSelect
            value={category}
            onChange={handleCategoryChange}
            items={categories.map((item) => item.name)}
          />
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
        <FHFormItem direction="vertical" label="노출여부">
          <FHSwitch value={useYN} onChange={handleUseYNChange} />
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

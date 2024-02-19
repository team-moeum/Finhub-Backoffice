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
import { FHTextArea } from '../../components/atoms/TextArea';

export const TopicCreatePage = () => {
  const [title, setTitle] = useState('');
  const [definition, setDefinition] = useState('');
  const [shortDefinition, setShortDefinition] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('ETF');
  const [useYN, setUseYN] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleTextChange =
    (type: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      } else if (type === 'definition') {
        setDefinition(value);
      } else if (type === 'shortDefinition') {
        setShortDefinition(value);
      }
    };

  const handleSubmit = () => {
    if (!title) {
      alert('주제명을 입력해주세요');
      return;
    }
    topicAPI.create({
      title,
      categoryId: categories.find((ct) => ct.name === category)?.id ?? -1,
      thumbnailImgPath: thumbnail,
      definition,
      shortDefinition,
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
      useYN: '전체',
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
        <FHFormItem direction="vertical" label="요약내용">
          <FHTextArea
            value={definition}
            onChange={handleTextChange('definition')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="원본내용">
          <FHTextArea
            value={shortDefinition}
            onChange={handleTextChange('shortDefinition')}
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
    max-width: 720px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 32px;
  `,
};

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { topicAPI } from '@finhub/api/topic';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { FHSelect } from '@finhub/components/atoms/Select';
import { FHSwitch } from '@finhub/components/atoms/Switch';
import { ICategory } from '@finhub/types/Category';
import { categoryAPI } from '@finhub/api/category';
import { FHTextArea } from '@finhub/components/atoms/TextArea';

export const TopicCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [definition, setDefinition] = useState('');
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
      }
    };

  const handleSubmit = async () => {
    if (!title) {
      alert('주제명을 입력해주세요');
      return;
    }
    if (!definition) {
      alert('원본내용을 입력해주세요');
      return;
    }

    const data = await topicAPI.create({
      title,
      categoryId: categories.find((ct) => ct.name === category)?.id ?? -1,
      definition,
      useYN,
      file: thumbnail,
    });

    alert('반영되었습니다.');
    navigate(`/services/topics/${data.id}`);
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
    if (listData.list.length) {
      setCategory(listData.list[0].name);
    }
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
        <FHFormItem direction="vertical" label="원본내용">
          <FHTextArea
            value={definition}
            onChange={handleTextChange('definition')}
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

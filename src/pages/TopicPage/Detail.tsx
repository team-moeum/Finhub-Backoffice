import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { useEffect, useState } from 'react';
import { topicAPI } from '../../api/topic';
import { useParams } from 'react-router-dom';
import { FHUploader } from '../../components/atoms/Uploader';
import { FHSelect } from '../../components/atoms/Select';
import { dataSource as categoryDataSource } from '../../api/category';

export const TopicDetailPage = () => {
  const { id } = useParams();
  const topicId = Number(id);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      }
    };

  const initRequest = () => {
    const data = topicAPI.show({
      id: topicId,
    });

    if (data) {
      setTitle(data.title ?? '');
      setCategory(data.category ?? 'ETF');
    }
  };

  const handleSubmit = () => {
    topicAPI.update({
      id: topicId,
      title,
      category,
      thumbnail,
    });

    alert('반영되었습니다.');
    initRequest();
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    initRequest();
  }, [initRequest]);
  return (
    <CreatePageTemplate label="주제 수정">
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
        <FHFormItem direction="vertical" label="카테고리">
          <FHSelect
            value={category}
            onChange={handleCategoryChange}
            items={categoryDataSource.map((item) => item.name)}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          주제 수정
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

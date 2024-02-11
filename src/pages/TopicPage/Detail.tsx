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
import { GPTCard } from '../../components/organisms/GPTCard';
import { produce } from 'immer';
import { FHSwitch } from '../../components/atoms/Switch';
import { ICategory } from '../../types/Category';
import { categoryAPI } from '../../api/category';

export const TopicDetailPage = () => {
  const { id } = useParams();
  const topicId = Number(id);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const [useYN, setUseYN] = useState(false);
  const [gptContent, setGptContent] = useState<
    {
      id: number;
      name: string;
      avatar: string;
      content: string;
    }[]
  >([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      }
    };

  const initRequest = async () => {
    const listData = await categoryAPI.list({
      page: 1,
      listSize: 20,
      keyword: '',
      useYN: '',
    });
    setCategories(listData.list);

    const data = topicAPI.show({
      id: topicId,
    });

    if (data) {
      setTitle(data.title ?? '');
      setCategory(data.category ?? 'ETF');
      setGptContent(data.gptContent ?? []);
      setUseYN(data.useYN === 'Y');
    }
  };

  const handleSubmit = () => {
    topicAPI.update({
      id: topicId,
      title,
      category,
      thumbnail,
      gptContent,
      useYN,
    });

    alert('반영되었습니다.');
    initRequest();
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleGPTCardClick = (idx: number) => () => {
    window.confirm(`${gptContent[idx].name} GPT를 재생성하시겠습니까?`);
  };

  const handleGPTCardChange =
    (idx: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setGptContent((prevGptContent) => {
        return produce(prevGptContent, (draft) => {
          draft[idx].content = e.target.value;
        });
      });
    };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <CreatePageTemplate label="주제 수정">
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
        <FHFormItem direction="vertical" label="GPT">
          {gptContent.map((gpt, index) => (
            <S.cardWrapper key={gpt.id}>
              <GPTCard
                avatar={gpt.avatar}
                content={gpt.content}
                name={gpt.name}
                onClick={handleGPTCardClick(index)}
                onChange={handleGPTCardChange(index)}
              />
            </S.cardWrapper>
          ))}
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
  cardWrapper: styled.div`
    width: 100%;
    margin-bottom: 32px;
  `,
};

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
import { FHTextArea } from '../../components/atoms/TextArea';

export const TopicDetailPage = () => {
  const { id } = useParams();
  const topicId = Number(id);
  const [title, setTitle] = useState('');
  const [definition, setDefinition] = useState('');
  const [shortDefinition, setShortDefinition] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const [useYN, setUseYN] = useState(false);
  const [gptList, setGptList] = useState<
    {
      gptId: number;
      userTypeId: number;
      usertypeName: string;
      avatarImgPath: string;
      content: string;
      useYN: string;
    }[]
  >([]);
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

  const initRequest = async () => {
    const listData = await categoryAPI.list({
      page: 1,
      listSize: 20,
      keyword: '',
      useYN: '전체',
    });
    setCategories(listData.list);

    const data = await topicAPI.show({
      id: topicId,
    });

    if (data) {
      setTitle(data.title ?? '');
      setCategory(data.categoryName ?? 'ETF');
      setDefinition(data.definition ?? '');
      setShortDefinition(data.shortDefinition ?? '');
      setGptList(data.gptList ?? []);
      setUseYN(data.useYN === 'Y');
    }
  };

  const handleSubmit = () => {
    topicAPI.update({
      topicId,
      title,
      definition,
      shortDefinition,
      categoryId: categories.find((ct) => ct.name === category)?.id ?? -1,
      thumbnailImgPath: './logo.svg',
      gptList: gptList.map((gpt) => ({
        gptId: gpt.gptId,
        content: gpt.content,
        useYN: gpt.useYN,
      })),
      useYN,
    });

    alert('반영되었습니다.');
    initRequest();
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleGPTCardClick = (idx: number) => () => {
    window.confirm(`${gptList[idx].usertypeName} GPT를 재생성하시겠습니까?`);
  };

  const handleGPTCardChange =
    (idx: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setGptList((prevGptList) => {
        return produce(prevGptList, (draft) => {
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
        <FHFormItem direction="vertical" label="GPT">
          {gptList.map((gpt, index) => (
            <S.cardWrapper key={gpt.gptId}>
              <GPTCard
                avatar={gpt.avatarImgPath}
                content={gpt.content}
                name={gpt.usertypeName}
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
    max-width: 720px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 32px;
  `,
  cardWrapper: styled.div`
    width: 100%;
    margin-bottom: 32px;
  `,
};

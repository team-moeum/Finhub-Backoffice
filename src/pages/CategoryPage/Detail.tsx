import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { useEffect, useState } from 'react';
import { categoryAPI } from '../../api/category';
import { useParams } from 'react-router-dom';
import { FHSwitch } from '../../components/atoms/Switch';
import { TopicCard } from '../../components/organisms/TopicCard';
import { produce } from 'immer';
import { FHDivider } from '../../components/atoms/Divider';
import { ICategory } from '../../types/Category';
import { ITopic } from '../../types/Topic';
import { FHUploader } from '../../components/atoms/Uploader';

export const CategoryDetailPage = () => {
  const { id } = useParams();
  const categoryId = Number(id);
  const [name, setName] = useState('');
  const [useYN, setUseYN] = useState(false);
  const [topicList, setTopicList] = useState<
    { id: number; title: string; categoryId: number; categoryName: string }[]
  >([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [thumbnail, setThumbnail] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'name') {
        setName(value);
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

    const showData = await categoryAPI.show({ id: categoryId });

    if (showData) {
      setName(showData.name ?? '');
      setUseYN(showData.useYN === 'Y');
      const list = showData.topicList.map((topic: ITopic) => {
        const category = listData.list.find((ct) => ct.id === categoryId);
        return { ...topic, categoryId, categoryName: category?.name ?? '' };
      });
      setTopicList(list);
      setThumbnail(showData.thumbnailImgPath);
    }
  };

  const handleSubmit = () => {
    categoryAPI.update({
      id: categoryId,
      name,
      useYN,
      topicList: topicList.map(({ id, categoryId, title }) => ({
        id,
        categoryId,
        title,
      })),
    });

    alert('반영되었습니다.');
    initRequest();
  };

  const handleTopicCardChange = (idx: number) => (value: string) => {
    setTopicList((prevTopicList) => {
      return produce(prevTopicList, (draft) => {
        const category = categories.find((ct) => ct.name === value);

        if (category) {
          draft[idx].categoryName = value;
          draft[idx].categoryId = category.id;
        }
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
    <CreatePageTemplate label="카테고리 수정">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="썸네일">
          <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="카테고리명">
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
        <FHFormItem direction="vertical" label="주제">
          {topicList.map((topic, index) => (
            <S.cardWrapper key={topic.id}>
              <S.cardWrapper>
                <TopicCard
                  title={topic.title}
                  onChange={handleTopicCardChange(index)}
                  categoryName={topic.categoryName}
                  categoryItems={categories.map((category) => category.name)}
                />
              </S.cardWrapper>
              <FHDivider direction="horizontal" />
            </S.cardWrapper>
          ))}
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          카테고리 수정
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
  `,
};

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

export const categoryDataSource = [
  {
    id: 1,
    name: 'ETF',
  },
  {
    id: 2,
    name: 'FUND',
  },
  {
    id: 3,
    name: 'IRP',
  },
];

export const CategoryDetailPage = () => {
  const { id } = useParams();
  const categoryId = Number(id);
  const [name, setName] = useState('');
  const [useYN, setUseYN] = useState(false);
  const [topicList, setTopicList] = useState<
    { id: number; title: string; categoryId: number; categoryName: string }[]
  >([]);

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'name') {
        setName(value);
      }
    };

  const initRequest = () => {
    const data = categoryAPI.show({
      id: categoryId,
    });

    if (data) {
      setName(data.name ?? '');
      setUseYN(data.useYN === 'Y');
      const list = data.topicList.map((topic) => {
        const category = categoryDataSource.find((ct) => ct.id === categoryId);
        return { ...topic, categoryId, categoryName: category?.name ?? '' };
      });
      setTopicList(list);
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
        const category = categoryDataSource.find((ct) => ct.name === value);

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
                  categoryItems={categoryDataSource.map(
                    (category) => category.name,
                  )}
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
    width: 360px;
    margin-bottom: 32px;
  `,
  cardWrapper: styled.div`
    width: 100%;
  `,
};

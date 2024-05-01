import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { produce } from 'immer';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { categoryAPI } from '@finhub/api/category';
import { FHSwitch } from '@finhub/components/atoms/Switch';
import { TopicCard } from '@finhub/components/organisms/TopicCard';
import { FHDivider } from '@finhub/components/atoms/Divider';
import { ICategory } from '@finhub/types/Category';
import { ITopic } from '@finhub/types/Topic';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { message } from 'antd';
import { useConfirmNavigate } from '@finhub/hooks/useConfirmNavigate';
import { useNavigate } from 'react-router-dom';

export const CategoryDetailPage = () => {
  const { id } = useParams();
  const categoryId = Number(id);
  const [name, setName] = useState('');
  const [useYN, setUseYN] = useState(false);
  const [topicList, setTopicList] = useState<
    {
      topicId: number;
      title: string;
      categoryId: number;
      categoryName: string;
    }[]
  >([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [thumbnail, setThumbnail] = useState('');
  const { onConfirm } = useConfirmNavigate(`/services/categories`);
  const navigate = useNavigate();

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
      topicList: topicList.map(({ topicId, categoryId, title }) => ({
        topicId,
        categoryId,
        title,
      })),
      s3ImgUrl: thumbnail,
      file: thumbnail,
    });

    message.success('반영되었습니다.');
    onConfirm('카테고리목록으로 이동하시겠습니까?');
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

  const handleDelete = async () => {
    if (window.confirm('카테고리를 삭제하시겠습니까?')) {
      await categoryAPI.remove({ id: categoryId });
      message.success('반영되었습니다.');
      navigate(`/services/categories`);
    }
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
            <S.cardWrapper key={topic.topicId}>
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
      <S.buttonWrapper>
        <FHButton width="100%" onClick={handleDelete} type="default">
          카테고리 삭제
        </FHButton>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          카테고리 수정
        </FHButton>
      </S.buttonWrapper>
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

  buttonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,
};

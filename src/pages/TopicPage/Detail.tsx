import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { useEffect, useState } from 'react';
import { topicAPI } from '../../api/topic';
import { useParams } from 'react-router-dom';

export const TopicDetailPage = () => {
  const { id } = useParams();
  const topicId = Number(id);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      }
    };

  const initRequest = () => {
    setIsLoading(true);
    const data = topicAPI.show({
      id: topicId,
    });

    if (data) {
      setTitle(data.title ?? '');
    }

    setIsLoading(false);
  };

  const handleSubmit = () => {
    topicAPI.update({
      id: topicId,
      title,
      thumbnail,
    });

    alert('반영되었습니다.');
    initRequest();
  };

  useEffect(() => {
    initRequest();
  }, [initRequest]);
  return (
    <CreatePageTemplate label="주제 수정">
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

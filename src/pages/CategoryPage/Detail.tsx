import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { useEffect, useState } from 'react';
import { categoryAPI } from '../../api/category';
import { useParams } from 'react-router-dom';

export const CategoryDetailPage = () => {
  const { id } = useParams();
  const categoryId = Number(id);
  const [name, setName] = useState('');

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
    }
  };

  const handleSubmit = () => {
    categoryAPI.update({
      id: categoryId,
      name,
    });

    alert('반영되었습니다.');
    initRequest();
  };

  useEffect(() => {
    initRequest();
  }, [initRequest]);
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
};

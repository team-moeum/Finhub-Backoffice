import styled from '@emotion/styled';
import { CreatePageTemplate } from '../../components/templates/Create';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHTextInput } from '../../components/atoms/TextInput';
import { FHButton } from '../../components/atoms/Button';
import { useEffect, useState } from 'react';
import { userTypeAPI } from '../../api/userType';
import { useParams } from 'react-router-dom';

export const UserTypeDetailPage = () => {
  const { id } = useParams();
  const userTypeId = Number(id);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'name') {
        setName(value);
      }
    };

  const initRequest = () => {
    setIsLoading(true);
    const data = userTypeAPI.show({
      id: userTypeId,
    });

    if (data) {
      setName(data.name ?? '');
    }

    setIsLoading(false);
  };

  const handleSubmit = () => {
    userTypeAPI.update({
      id: userTypeId,
      name,
      avatar,
    });

    alert('반영되었습니다.');
    initRequest();
  };

  useEffect(() => {
    initRequest();
  }, [initRequest]);
  return (
    <CreatePageTemplate label="유저유형 수정">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="유저유형명">
          <FHTextInput
            type="text"
            value={name}
            onChange={handleTextChange('name')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          유저유형 수정
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

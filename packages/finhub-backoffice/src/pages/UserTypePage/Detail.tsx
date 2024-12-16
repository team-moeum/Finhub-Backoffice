import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { usertypeAPI } from '@finhub/api/userType';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { FHSwitch } from '@finhub/components/atoms/Switch';
import { message } from 'antd';

export const UserTypeDetailPage = () => {
  const { id } = useParams();
  const userTypeId = Number(id);
  const [name, setName] = useState('');
  const [avatarImgPath, setAvatarImgPath] = useState('');
  const [useYN, setUseYN] = useState(false);
  const navigate = useNavigate();

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'name') {
        setName(value);
      }
    };

  const initRequest = async () => {
    const data = await usertypeAPI.show({
      id: userTypeId,
    });

    if (data) {
      setAvatarImgPath(data.avatarImgPath ?? '');
      setName(data.name ?? '');
      setUseYN(data.useYN === 'Y');
    }
  };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  const handleSubmit = () => {
    usertypeAPI.update({
      id: userTypeId,
      name,
      useYN,
      s3ImgUrl: avatarImgPath,
      file: avatarImgPath,
    });

    alert('반영되었습니다.');
  };

  const handleDelete = async () => {
    if (window.confirm('유저유형을 삭제하시겠습니까?')) {
      await usertypeAPI.remove({ id: userTypeId });
      message.success('반영되었습니다.');
      navigate(`/services/usertypes`);
    }
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <CreatePageTemplate label="유저유형 수정">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="아바타">
          <FHUploader
            thumbnail={avatarImgPath}
            setThumbnail={setAvatarImgPath}
          />
        </FHFormItem>
      </S.formItemWrapper>
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
        <FHFormItem direction="vertical" label="노출여부">
          <FHSwitch value={useYN} onChange={handleUseYNChange} />
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
  buttonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,
};

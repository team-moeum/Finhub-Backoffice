import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { useNavigate } from 'react-router-dom';
import { bannerAPI } from '@finhub/api/banner';
import { FHSelect } from '@finhub/components/atoms/Select';

export const BannerCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [bannerType, setBannerType] = useState('기타');
  const [thumbnail, setThumbnail] = useState('');

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      } else if (type === 'subTitle') {
        setSubTitle(value);
      } else if (type === 'landingPageUrl') {
        setLandingPageUrl(value);
      }
    };

  const handleSubmit = async () => {
    if (!title) {
      alert('배너제목을 입력해주세요');
      return;
    }
    if (!subTitle) {
      alert('부제를 입력해주세요');
      return;
    }
    if (!landingPageUrl) {
      alert('랜딩URL을 입력해주세요');
      return;
    }
    if (!bannerType) {
      alert('배너타입을 선택해주세요');
      return;
    }

    const data = await bannerAPI.create({
      title,
      subTitle,
      landingPageUrl,
      bannerType,
      useYN: 'N',
      file: thumbnail,
    });

    alert('반영되었습니다.');
    navigate(`/services/banners/${data.id}`);
  };

  const handleBannerChange = (value: string) => {
    setBannerType(value);
  };

  return (
    <CreatePageTemplate label="배너 추가">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="배너이미지">
          <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="배너제목">
          <FHTextInput
            type="text"
            value={title}
            onChange={handleTextChange('title')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="배너부제">
          <FHTextInput
            type="text"
            value={subTitle}
            onChange={handleTextChange('subTitle')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="배너랜딩페이지">
          <FHTextInput
            type="text"
            value={landingPageUrl}
            onChange={handleTextChange('landingPageUrl')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="배너타입">
          <FHSelect
            value={bannerType}
            onChange={handleBannerChange}
            items={['기타', '토픽', 'gpt칼럼']}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          배너 추가
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
};

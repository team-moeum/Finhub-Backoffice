import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHSwitch } from '@finhub/components/atoms/Switch';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { message } from 'antd';
import { useConfirmNavigate } from '@finhub/hooks/useConfirmNavigate';
import { useNavigate } from 'react-router-dom';
import { bannerAPI } from '@finhub/api/banner';
import { FHSelect } from '@finhub/components/atoms/Select';

export const BannerDetailPage = () => {
  const { id } = useParams();
  const bannerId = Number(id);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [bannerType, setBannerType] = useState('기타');
  const [thumbnail, setThumbnail] = useState('');
  const [useYN, setUseYN] = useState(false);
  const { onConfirm } = useConfirmNavigate(`/services/banners`);
  const navigate = useNavigate();

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

  const initRequest = async () => {
    const showData = await bannerAPI.show({ id: bannerId });

    if (showData) {
      setTitle(showData.title ?? '');
      setSubTitle(showData.subTitle ?? '');
      setLandingPageUrl(showData.landingPageUrl ?? '');
      setBannerType(showData.bannerType ?? '기타');
      setUseYN(showData.useYN === 'Y');
      setThumbnail(showData.bannerImageUrl);
    }
  };

  const handleSubmit = () => {
    bannerAPI.update({
      id: bannerId,
      title,
      subTitle,
      landingPageUrl,
      bannerType,
      useYN: useYN ? 'Y' : 'N',
      file: thumbnail,
      s3ImgUrl: thumbnail,
    });

    message.success('반영되었습니다.');
    onConfirm('배너목록으로 이동하시겠습니까?');
  };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  const handleDelete = async () => {
    if (window.confirm('배너를 삭제하시겠습니까?')) {
      await bannerAPI.remove({ id: bannerId });
      message.success('반영되었습니다.');
      navigate(`/services/banners`);
    }
  };

  const handleBannerChange = (value: string) => {
    setBannerType(value);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <CreatePageTemplate label="배너 수정">
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
            items={['기타', '토픽', 'gpt컬럼']}
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
          배너 삭제
        </FHButton>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          배너 수정
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

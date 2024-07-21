import { Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { FHDivider } from '@finhub/components/atoms/Divider';
import { FHButton } from '@finhub/components/atoms/Button';
import { emoticonAPI } from '@finhub/api/emoticon';
import { IEmoticon } from '@finhub/types/Emoticon';
import { DeleteOutlined } from '@ant-design/icons';
import theme from '@finhub/styles/theme';

export const EmoticonModal = ({
  open = false,
  loading = false,
  onCancel,
  onOK,
}: {
  open?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onOK?: () => void;
}) => {
  const [list, setList] = useState<IEmoticon[]>([]);
  const [thumbnail, setThumbnail] = useState();

  const initRequest = async () => {
    const { calendarEmoticons } = await emoticonAPI.list();
    setList(calendarEmoticons);
  };

  const handleSubmit = async () => {
    if (onOK) onOK();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleUpload = async () => {
    if (!thumbnail) {
      return message.error('파일이 없습니다.');
    }
    await emoticonAPI.create({ file: thumbnail });

    message.success('업로드되었습니다');

    initRequest();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('이모티콘을 삭제하시겠습니까?')) {
      await emoticonAPI.remove({ id });
      message.success('반영되었습니다.');

      initRequest();
    }
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <Modal
      title={'이모티콘 관리'}
      okText="저장"
      open={open}
      onOk={handleSubmit}
      confirmLoading={loading}
      onCancel={handleCancel}
      closeIcon={false}
    >
      <S.formItemWrapper>
        <S.uploadWrapper>
          <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
          <FHButton onClick={handleUpload} type="primary">
            업로드
          </FHButton>
        </S.uploadWrapper>
        <FHDivider />
        <S.listWrapper>
          {list.map((emoticon) => (
            <S.emoticonItemWrapper
              key={emoticon.id}
              onClick={() => handleDelete(emoticon.id)}
            >
              <S.img alt="emoticon" src={emoticon.s3ImgUrl} />
              <S.overlay>
                <DeleteOutlined />
              </S.overlay>
            </S.emoticonItemWrapper>
          ))}
        </S.listWrapper>
      </S.formItemWrapper>
    </Modal>
  );
};

const S = {
  uploadWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  `,
  formItemWrapper: styled.div`
    margin-bottom: 32px;
    width: 100%;
  `,
  listWrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  `,
  img: styled.img`
    width: 100%;
    height: 100%;
  `,
  emoticonItemWrapper: styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #d9d9d9;
    cursor: pointer;
  `,
  overlay: styled.div`
    background-color: transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${theme.colors.white};
      font-size: 24px;
      visibility: hidden;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
      transition: 0.3s background;

      svg {
        visibility: visible;
      }
    }
  `,
};

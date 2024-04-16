import { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHDivider } from '@finhub/components/atoms/Divider';
import { LayoutTemplate } from '@finhub/components/templates/Layout';
import { avatarAPI } from '@finhub/api/avatar';
import { IAvatar } from '@finhub/types/Avatar';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import * as S from './List.style';

export const AvatarListPage = () => {
  const [list, setList] = useState<IAvatar[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await avatarAPI.create({ file: thumbnail });
    message.info('반영되었습니다');
    initRequest();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const initRequest = async () => {
    const { userAvatars } = await avatarAPI.list();
    setList(userAvatars);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <>
      <LayoutTemplate>
        <S.pageHeaderWrapper>
          <div>아바타 목록</div>
          <FHButton
            onClick={showModal}
            type="primary"
          >{`아바타 추가`}</FHButton>
        </S.pageHeaderWrapper>
        <S.contentWrapper>
          <FHDivider />
          <S.listWrapper>
            {list.map((avatar) => (
              <img
                width={124}
                height={124}
                key={avatar.id}
                alt="avatar"
                src={avatar.s3ImgUrl}
              />
            ))}
          </S.listWrapper>
        </S.contentWrapper>
      </LayoutTemplate>
      <Modal
        title="아바타추가"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
      </Modal>
    </>
  );
};

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';

export interface UploaderProps {
  thumbnail: any;
  setThumbnail: React.SetStateAction<any>;
  readOnly?: boolean;
}

export const FHUploader = ({
  thumbnail,
  setThumbnail,
  readOnly = false,
}: UploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(thumbnail);

  const getBase64 = (
    img: File,
    callback: (url: string | ArrayBuffer | null) => void,
  ) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    setLoading(true);
    getBase64(file, (url: any) => {
      setLoading(false);
      setImageUrl(url);
      setThumbnail(file);
    });
  };

  useEffect(() => {
    if (typeof thumbnail === 'string') {
      setImageUrl(thumbnail);
    }
  }, [thumbnail]);

  return (
    <UploadContainer>
      {imageUrl && (
        <Image
          src={imageUrl as string}
          alt="avatar"
          onClick={
            !readOnly
              ? () => document.getElementById('fileInput')?.click()
              : undefined
          }
        />
      )}
      {!readOnly && (
        <>
          <UploadButton
            htmlFor="fileInput"
            style={{ opacity: imageUrl ? 0 : 1 }}
          >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
          </UploadButton>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleChange}
            accept="image/png, image/jpeg"
          />
        </>
      )}
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  display: inline-block;
  width: 104px;
  height: 104px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #fafafa;
`;

const UploadButton = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import ReactLoading from 'react-loading';

export const LoadingTemplate = ({
  loading = false,
  children,
}: {
  loading?: boolean;
  children: ReactNode;
}) => {
  return (
    <>
      {loading && (
        <S.dimWrapper show={loading}>
          <ReactLoading color="#000" />
        </S.dimWrapper>
      )}
      {children}
    </>
  );
};

const S = {
  dimWrapper: styled.div<{ show: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.25);
    transition: opacity: .3s;
    opacity: ${({ show }) => (show ? '1' : '0')};
  `,
};

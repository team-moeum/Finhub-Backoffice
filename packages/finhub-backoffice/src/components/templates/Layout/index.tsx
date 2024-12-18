import { ReactNode } from 'react';
import { FHHeader } from '../../organisms/Header';
import * as S from './Layout.style';

export const LayoutTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <S.layoutWrapper>
      <FHHeader />
      <S.layoutContentWrapper>{children}</S.layoutContentWrapper>
    </S.layoutWrapper>
  );
};

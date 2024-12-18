import { ArrowLeftOutlined } from '@ant-design/icons';
import { LayoutTemplate } from '../Layout';
import { ReactNode } from 'react';
import * as S from './Create.style';

export interface CreatePageTemplateProps {
  label: string;
  children: ReactNode;
}

export const CreatePageTemplate = ({
  label,
  children,
}: CreatePageTemplateProps) => {
  return (
    <LayoutTemplate>
      <S.pageHeaderWrapper>
        <button onClick={() => window.history.back()}>
          <ArrowLeftOutlined />
        </button>
        <div>{label}</div>
      </S.pageHeaderWrapper>
      <S.contentWrapper>{children}</S.contentWrapper>
    </LayoutTemplate>
  );
};

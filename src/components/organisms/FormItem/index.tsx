import { ReactNode } from 'react';
import * as S from './FormItem.style';

export interface FormItemProps {
  direction: 'vertical' | 'horizontal';
  label: string;
  children: ReactNode;
}

export const FHFormItem = ({
  direction = 'vertical',
  label,
  children,
}: FormItemProps) => {
  if (direction === 'horizontal') {
    return (
      <S.rowInputWrapper>
        <S.rowLabelWrapper>{label}</S.rowLabelWrapper>
        {children}
      </S.rowInputWrapper>
    );
  }
  return (
    <S.colInputWrapper>
      <S.colLabelWrapper>{label}</S.colLabelWrapper>
      {children}
    </S.colInputWrapper>
  );
};

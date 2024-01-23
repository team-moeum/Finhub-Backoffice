/* eslint-disable @typescript-eslint/no-explicit-any */
import { FHSelect } from '../../atoms/Select';
import * as S from './TopicCard.style';

export type SelectOnChangeType = (value: any, option: any) => void;

export interface GPTCardProps {
  onChange: SelectOnChangeType;
  title: string;
  categoryName: string;
  categoryItems: string[];
}

export const TopicCard = ({
  title,
  onChange,
  categoryName,
  categoryItems,
}: GPTCardProps) => {
  return (
    <S.cardWrapper>
      <S.name>{title}</S.name>
      <FHSelect
        value={categoryName}
        onChange={onChange}
        items={categoryItems}
      />
    </S.cardWrapper>
  );
};

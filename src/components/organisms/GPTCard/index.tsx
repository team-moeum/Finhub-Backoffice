import { FHButton } from '../../atoms/Button';
import { FHSwitch } from '../../atoms/Switch';
import { FHTextArea } from '../../atoms/TextArea';
import { FHFormItem } from '../FormItem';
import * as S from './GPTCard.style';

export interface GPTCardProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  content: string;
  useYN?: boolean;
  onUseYNChange?: (value: boolean) => void;
}

export const GPTCard = ({
  useYN = false,
  onUseYNChange,
  content,
  onChange,
  onClick,
}: GPTCardProps) => {
  return (
    <S.cardWrapper>
      <S.introWrapper>
        <FHFormItem direction="horizontal" label="노출여부">
          <FHSwitch />
        </FHFormItem>
        <FHButton type="default" onClick={onClick}>
          생성
        </FHButton>
      </S.introWrapper>
      <FHTextArea value={content} onChange={onChange} />
    </S.cardWrapper>
  );
};

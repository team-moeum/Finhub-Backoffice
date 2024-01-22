import { FHButton } from '../../atoms/Button';
import { FHTextArea } from '../../atoms/TextArea';
import * as S from './GPTCard.style';

export interface GPTCardProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  avatar: string;
  name: string;
  content: string;
}

export const GPTCard = ({
  avatar,
  name,
  content,
  onChange,
  onClick,
}: GPTCardProps) => {
  return (
    <S.cardWrapper>
      <S.introWrapper>
        <S.userTypeWrapper>
          <S.avatar style={{ backgroundImage: `url(${avatar})` }} />
          <S.name>{name}</S.name>
        </S.userTypeWrapper>
        <FHButton type="default" onClick={onClick}>
          생성
        </FHButton>
      </S.introWrapper>
      <FHTextArea value={content} onChange={onChange} />
    </S.cardWrapper>
  );
};

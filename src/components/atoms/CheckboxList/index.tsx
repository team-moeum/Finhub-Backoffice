import { Checkbox } from 'antd';
import * as S from './CheckboxList.style';

export interface CheckboxData {
  key: string;
  label: string;
}

export interface CheckboxListProps {
  list: CheckboxData[];
  checkedList: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
}

export const FHCheckboxList = ({
  list = [],
  checkedList = [],
  onChange = () => null,
}: CheckboxListProps) => {
  return (
    <S.gap>
      {list.map((item) => (
        <S.wrapper key={item.key}>
          <Checkbox
            onChange={({ target }) => onChange({ ...target, key: item.key })}
            checked={checkedList.includes(item.key)}
          >
            {item.label}
          </Checkbox>
        </S.wrapper>
      ))}
    </S.gap>
  );
};

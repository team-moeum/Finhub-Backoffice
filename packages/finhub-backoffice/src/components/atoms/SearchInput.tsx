import { Input } from 'antd';
const { Search } = Input;

export interface SearchInputProps {
  onSearch: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    info?: {
      source?: 'clear' | 'input';
    },
  ) => void;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

export const FHSearchInput = ({
  onSearch,
  value,
  onChange,
  placeholder,
}: SearchInputProps) => {
  return (
    <Search
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? '검색어를 입력해주세요'}
      allowClear
      onSearch={onSearch}
    />
  );
};

import { Select } from 'antd';

export interface SelectProps {
  items: string[];
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any, option: any) => void;
}

export const FHSelect = ({ items = [], value, onChange }: SelectProps) => {
  return (
    <Select value={value} style={{ minWidth: '124px' }} onChange={onChange}>
      {items.map((v) => {
        return (
          <option key={v} value={v}>
            {v}
          </option>
        );
      })}
    </Select>
  );
};

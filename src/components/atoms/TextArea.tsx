import { Input } from 'antd';

const { TextArea } = Input;

export interface TextAreaProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  resize?: boolean;
  height?: string | number;
}

export const FHTextArea = ({
  value,
  onChange,
  placeholder = '',
  resize = false,
  height = 120,
}: TextAreaProps) => {
  return (
    <TextArea
      value={value}
      showCount
      allowClear
      onChange={onChange}
      placeholder={placeholder}
      style={{ height, resize: resize ? 'vertical' : 'none' }}
    />
  );
};

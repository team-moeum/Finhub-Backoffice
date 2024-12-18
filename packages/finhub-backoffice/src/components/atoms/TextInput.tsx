import { Input, InputProps } from 'antd';

export interface TextInputProps extends Omit<InputProps, 'type'> {
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text';
}

export const FHTextInput = ({
  value,
  onChange = () => null,
  onBlur = () => null,
  placeholder = '',
  type = 'text',
  ...props
}: TextInputProps) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      {...props}
    />
  );
};

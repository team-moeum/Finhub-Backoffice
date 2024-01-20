import { Divider } from 'antd';

export interface DividerProps {
  type?: 'horizontal' | 'vertical';
}

export const FHDivider = ({ type = 'horizontal' }: DividerProps) => {
  return <Divider type={type} />;
};

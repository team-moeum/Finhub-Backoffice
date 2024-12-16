import { Divider } from 'antd';

export interface DividerProps {
  direction?: 'horizontal' | 'vertical';
}

export const FHDivider = ({ direction = 'horizontal' }: DividerProps) => {
  return <Divider type={direction} />;
};

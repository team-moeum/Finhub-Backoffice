import { ReactNode } from 'react';
import { Button } from 'antd';

interface ButtonProps {
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children: ReactNode;
  width?: string | number;
}

export const FHButton = ({ type, onClick, width, children }: ButtonProps) => {
  return (
    <Button type={type} onClick={onClick} style={{ width }}>
      {children}
    </Button>
  );
};

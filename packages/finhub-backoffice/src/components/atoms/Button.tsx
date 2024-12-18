import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

interface FHButtonProps extends ButtonProps {
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children: ReactNode;
  width?: string | number;
}

export const FHButton = ({
  type,
  onClick,
  width,
  children,
  ...props
}: FHButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      style={{ width, textAlign: 'center' }}
      {...props}
    >
      {children}
    </Button>
  );
};

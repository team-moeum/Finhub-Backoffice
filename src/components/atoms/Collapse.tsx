import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

export const FHCollapse = ({ onChange, items }: CollapseProps) => {
  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />
  );
};

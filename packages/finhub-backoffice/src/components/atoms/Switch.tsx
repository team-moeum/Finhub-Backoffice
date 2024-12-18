import { Switch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/es/switch';

export const FHSwitch = ({
  checkedChildren = '',
  unCheckedChildren = '',
  value = false,
  onChange = () => null,
}: {
  checkedChildren?: string;
  unCheckedChildren?: string;
  value?: boolean;
  onChange?: SwitchChangeEventHandler;
}) => {
  return (
    <Switch
      onChange={onChange}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
      value={value}
    />
  );
};

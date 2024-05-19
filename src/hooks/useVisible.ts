import { useState } from 'react';

type ReturnType = [boolean, () => void, () => void];

export const useVisible = (defaultValue = false): ReturnType => {
  const [isVisible, setIsVisible] = useState(defaultValue);

  const open = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };

  return [isVisible, open, close];
};

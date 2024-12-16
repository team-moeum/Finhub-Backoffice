import { useNavigate } from 'react-router-dom';

export const useConfirmNavigate = (redirectUrl: string) => {
  const navigate = useNavigate();

  const handleConfirm = (msg: string) => {
    if (window.confirm(msg ?? '정말 이동하시겠습니까?')) {
      navigate(redirectUrl);
    }
  };

  return {
    onConfirm: handleConfirm,
  };
};

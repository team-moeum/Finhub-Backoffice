import { useNavigate } from 'react-router-dom';
import { FHButton } from '../components/atoms/Button';
import { LayoutTemplate } from '../components/templates/Layout';

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <LayoutTemplate>
      <div>ERROR</div>
      <FHButton type="link" onClick={() => navigate('/')}>
        홈으로
      </FHButton>
    </LayoutTemplate>
  );
};

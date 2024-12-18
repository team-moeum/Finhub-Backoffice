import ReactLoading from 'react-loading';
import * as S from './LoadingPage.style';

export const LoadingPage = () => {
  return (
    <S.container>
      <ReactLoading color="#000" />
    </S.container>
  );
};

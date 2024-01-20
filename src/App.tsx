import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { GlobalStyles } from './styles/global';
import { AuthHoc } from './components/hocs/AuthHoc';
import { AppRouter } from './configs/Router';

function App() {
  return (
    <RecoilRoot>
      <Global styles={GlobalStyles} />
      <AuthHoc>
        <AppRouter />
      </AuthHoc>
    </RecoilRoot>
  );
}

export default App;

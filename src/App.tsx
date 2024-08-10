import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { GlobalStyles } from './styles/global';
import { AuthHoc } from './components/hocs/AuthHoc';
import { AppRouter } from './configs/Router';
import './App.css';

import locale from 'antd/lib/locale/ko_KR';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

function App() {
  return (
    <ConfigProvider locale={locale}>
      <RecoilRoot>
        <Global styles={GlobalStyles} />
        <AuthHoc>
          <AppRouter />
        </AuthHoc>
      </RecoilRoot>
    </ConfigProvider>
  );
}

export default App;

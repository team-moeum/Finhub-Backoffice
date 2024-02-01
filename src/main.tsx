import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initMsw } from './mocks/initMsw.ts';

initMsw();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

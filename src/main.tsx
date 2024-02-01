import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initMsw } from './api/mocks/initMsw';

initMsw();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      tsconfigPaths(),
    ],
    preview: {
      port: 3001,
      strictPort: true,
      proxy: {
        '/api/v1': {
          changeOrigin: true,
          target: env.VITE_API_BASE_URL,
        },
      },
    },
    server: {
      port: 3001,
      strictPort: true,
      host: true,
    },
    resolve: {
      alias: {
        'react-router-dom': 'react-router-dom',
      },
    },
  };
});

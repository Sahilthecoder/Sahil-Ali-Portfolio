import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Set base URL for GitHub Pages in production
  const isProduction = mode === 'production';
  const base = isProduction ? '/Sahil_Ali-Portfolio/' : '/';
  
  console.log(`Running in ${mode} mode with base URL: ${base}`);
  
  return {
    base,
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.BASE_URL': JSON.stringify(base),
      'import.meta.env.BASE_URL': JSON.stringify(base)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './public')
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            framer: ['framer-motion'],
            icons: ['react-icons']
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.');
            const ext = (info?.[info.length - 1] || '').toLowerCase();
            
            // Keep service worker at the root with its exact name
            if (assetInfo.name === 'service-worker.js') {
              return '[name][extname]';
            }
            
            if (ext === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            }
            if (ext === 'js') {
              return 'assets/[name].[hash].js';
            }
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (['woff2', 'woff', 'ttf', 'eot'].includes(ext)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      },
      copyPublicDir: true
    },
    server: {
      port: 3000,
      open: true,
      fs: {
        allow: ['..']
      }
    }
  };
});

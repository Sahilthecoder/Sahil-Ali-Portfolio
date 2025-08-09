import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Load environment variables
const env = loadEnv('all', process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Always use the base path for GitHub Pages in production
  const base = mode === 'production' ? '/Sahil-Ali-Portfolio/' : '/';
  
  console.log(`Running in ${mode} mode with base URL: ${base}`);
  
  // Set the base URL as an environment variable for the app to use
  process.env.VITE_BASE_URL = base;
  process.env.BASE_URL = base; // For compatibility with some libraries
  
  return {
    base,
    plugins: [react()],
    define: {
      'process.env': {
        BASE_URL: JSON.stringify(base)
      }
    },
    envPrefix: ['VITE_', 'NEXT_'],
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
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['framer-motion', 'react-icons'],
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      fs: {
        allow: ['..']
      },
      proxy: {
        // Add any API proxies here if needed
      }
    },
    preview: {
      port: 5000,
      open: true,
      proxy: {
        // Same as dev server proxy if needed
      }
    }
  };
});

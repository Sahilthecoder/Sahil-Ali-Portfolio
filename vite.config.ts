import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { splitVendorChunkPlugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Set base URL for GitHub Pages in production
  const isProduction = mode === 'production';
  const base = isProduction ? '/Sahil-Ali-Portfolio/' : '/';
  
  console.log(`Running in ${mode} mode with base URL: ${base}`);
  
  return {
    base,
    plugins: [
      react(),
      splitVendorChunkPlugin(),
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Sahil Ali - Portfolio',
          short_name: 'Sahil Ali',
          description: 'Portfolio showcasing my projects and experience',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ],
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
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false,
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: ['console.log'],
          passes: 2,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react-dom')) {
                return 'vendor_react-dom';
              }
              if (id.includes('react')) {
                return 'vendor_react';
              }
              if (id.includes('framer-motion')) {
                return 'vendor_framer-motion';
              }
              if (id.includes('react-icons')) {
                return 'vendor_icons';
              }
              if (id.includes('@radix-ui')) {
                return 'vendor_radix';
              }
              return 'vendor';
            }
          },
          chunkFileNames: (chunkInfo) => {
            const isVendor = chunkInfo.name.startsWith('vendor');
            return isVendor 
              ? `assets/vendor.[hash].js`
              : 'assets/[name].[hash].js';
          },
          entryFileNames: 'assets/[name].[hash].js',
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

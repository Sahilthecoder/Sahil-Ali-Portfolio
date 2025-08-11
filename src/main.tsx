import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/ThemeProvider';
import { registerServiceWorker, unregisterServiceWorker, clearServiceWorkerCache } from './utils/registerServiceWorker';
import './styles/base/globals.css';

// Handle service worker registration
if (import.meta.env.PROD) {
  registerServiceWorker();
} else if (import.meta.env.DEV) {
  // In development, unregister any existing service workers
  unregisterServiceWorker().then(() => {
    clearServiceWorkerCache().catch(console.error);
  });
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}
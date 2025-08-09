import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/ThemeProvider';
import { registerServiceWorker } from './utils/registerServiceWorker';
import './styles/base/globals.css';

// Register service worker in production
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
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
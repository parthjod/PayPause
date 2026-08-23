// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n/index';   // initialize i18next before rendering
import './index.css';
import { App } from './App';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

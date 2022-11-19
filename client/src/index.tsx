import React, { Suspense } from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <Suspense fallback="sdfsdfdsfsdfds">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
);

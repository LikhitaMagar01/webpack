import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(<App />);
  
  return () => {
    root.unmount();
  };
};

// If we are in development and running the app standalone
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#root') as HTMLElement;
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
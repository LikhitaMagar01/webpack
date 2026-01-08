import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

if (import.meta.env.DEV) {
  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
}

export const mount = (container: HTMLElement) => {
  const root = createRoot(container);
  root.render(<App />);
  return () => {
    root.unmount();
  };
};

import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useReactLoader(options: { initialPath?: string, containerId?: string } = {}) {
  const isDev = import.meta.env.VITE_IS_DEV ? import.meta.env.VITE_IS_DEV === 'true' : import.meta.env.DEV;
  const unmountRef = ref<(() => void) | null>(null);

  if (!isDev) {
    onMounted(async () => {
      try {
        // Load React module dynamically using script tag with type="module"
        if (!(window as any).__reactAppLoaded) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'module';
            script.textContent = `
              import * as ReactApp from '/react-app.js';
              window.__reactApp = ReactApp;
              window.__reactAppLoaded = true;
              window.dispatchEvent(new Event('reactAppLoaded'));
            `;
            script.onerror = () => reject(new Error('Failed to load React module'));
            document.head.appendChild(script);
            window.addEventListener('reactAppLoaded', () => resolve(), { once: true });
          });
        }
        
        const { mount } = (window as any).__reactApp;
        const container = document.getElementById(options.containerId || 'react-app');
        if (container && mount) {
          unmountRef.value = mount(container);
        }
      } catch (error) {
        console.error('Failed to load React app', error);
      }
    });

    onBeforeUnmount(() => {
      if (unmountRef.value) {
        unmountRef.value();
      }
    });
  }

  return { unmountRef };
}

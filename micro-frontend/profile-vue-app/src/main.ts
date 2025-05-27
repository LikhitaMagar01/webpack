import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const mount = () => {
  const app = createApp(App)
  app.mount('#app')
}

// In development, mount immediately
if (process.env.NODE_ENV === 'development') {
  mount()
}

export { mount } 
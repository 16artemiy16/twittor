import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import uiPlugin from '@/plugins/ui-kit';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(uiPlugin)
  .mount('#app')

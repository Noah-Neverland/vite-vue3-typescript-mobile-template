import 'virtual:uno.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import '@/styles/index.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';

async function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 配置路由
  setupRouter(app);

  app.mount('#app');
}

bootstrap();

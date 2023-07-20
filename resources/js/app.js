import axios from 'axios';
import router from './router/router';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { createApp } from 'vue';

import App from './Pages/App.vue';

const create = async () => {
  // app instance
  const app = createApp(App);

  app.use(router);

  // prototypes
  app.config.globalProperties.window = window;
  app.mount('#app');
}

create();

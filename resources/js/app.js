import axios from 'axios';
import { createApp } from 'vue';
import router from './router/router';
import FontAwesomeIcon from './fontawesome';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


import App from './Pages/App.vue';

const create = async () => {
  // app instance
  const app = createApp(App);

  // router
  app.use(router);

  // components
  app.component('FontAwesomeIcon', FontAwesomeIcon);

  // prototypes
  app.config.globalProperties.window = window;
  app.mount('#app');
}

create();

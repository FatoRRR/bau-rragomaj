import './bootstrap';
import '../css/app.css';


import { createApp } from 'vue';

import App from './Pages/App.vue';

const create = async () => {
  // app instance
  const app = createApp(App);

  // prototypes
  app.config.globalProperties.window = window;
  app.mount('#app');
}

create();

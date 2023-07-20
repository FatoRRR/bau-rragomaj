/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  saveScrollPosition: true,
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('pages/Home.vue'),
    },
  ],
});

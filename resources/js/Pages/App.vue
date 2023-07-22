<template>
  <v-header></v-header>
  <v-navigation></v-navigation>
  <div id="page-content">
    <router-view />
  </div>
  <v-footer></v-footer>
</template>

<script>
import VNavigation from 'organisms/Navigation.vue';
import VHeader from 'organisms/Header.vue';
import VFooter from 'organisms/Footer.vue';

export default {
  name: 'App',
  components: {
    VNavigation,
    VHeader,
    VFooter
  }
}
</script>

<style>
</style>

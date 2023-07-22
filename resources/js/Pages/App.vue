<template>
  <v-header></v-header>
  <router-view />
  <v-footer></v-footer>
</template>

<script>
import VHeader from 'organisms/Header.vue';
import VFooter from 'organisms/Footer.vue';

export default {
  name: 'App',
  components: {
    VHeader,
    VFooter
  }
}
</script>

<style>
</style>

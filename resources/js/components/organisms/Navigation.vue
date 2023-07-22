<template>
  <nav>
    <a
      v-for="(link, index) in links"
      :key="index"
      @click="() => $router.push(link.path)"
      :class="{
        'active': $route.path === link.path,
      }"
    >
      <v-icon :icon="link.icon"></v-icon>
      {{ link.name }}
    </a>
  </nav>
</template>

<script>
import VIcon from 'library/atoms/Icon.vue';

export default {
  name: 'Navigation',
  components: {
    VIcon,
  },
  computed: {
    links() {
      return [
        {
          name: 'Home',
          path: '/',
          icon: 'home',
        },
        {
          name: 'Leistungen',
          path: '/services',
          icon: 'person-digging',
        },
        {
          name: 'Referenzen',
          path: '/references',
          icon: 'check',
        },
        {
          name: 'Kontakt',
          path: '/contact',
          icon: 'message',
        },
      ];
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  background-color: rgba(var(--primary-action-color), .87);
  color: rgba(var(--secondary-color), .87);
  border-radius: 50px;
  align-items: center;
  box-shadow: $shadow;
  position: relative;
  min-height: 80px;
  display: flex;
  margin: 0 auto;
  height: 80px;


  a {
    gap: 1rem;
    width: 200px;
    height: 100%;
    display: flex;
    cursor: pointer;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    transition: all .25s ease;

    .icon-container {
      color: rgba(var(--secondary-color), .87);
    }

    &:hover,
    &.active {
      background-color: rgba(var(--primary-action-color), 1);
      color: rgba(var(--secondary-color), 1);
    }
  }
}
</style>

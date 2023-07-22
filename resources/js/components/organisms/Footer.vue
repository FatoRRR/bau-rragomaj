<template>
  <footer>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.760303105725!2d7.863301376977934!3d50.631569471627486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be9d87ef3a41c1%3A0x4f22d05fb4c925f1!2sMittelstra%C3%9Fe%2024%2C%2057642%20Alpenrod!5e0!3m2!1sen!2sde!4v1690029223614!5m2!1sen!2sde"
      width="100%"
      height="450"
      min-height="450"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <nav>
      <a
        v-for="(link, index) in links"
        :key="index"
        @click="() => $router.push(link.path)"
      >
        {{ link.name }}
      </a>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    links() {
      return [
        {
          name: 'Kontakt',
          path: '/contact',
        },
        {
          name: 'Datenschutzerklärung',
          path: '/data-privacy',
        },
        {
          name: 'Impressum',
          path: '/imprint',
        },
      ];
    },
  },
}
</script>

<style lang="scss">
footer {
  flex-direction: column;
  display: flex;

  nav {
    background-color: rgb(var(--secondary-background-color));
    color: rgb(var(--secondary-color));
    align-items: center;
    min-height: 80px;
    margin: 0 auto;
    display: flex;
    height: 80px;
    width: 100%;
    gap: 1rem;

    a {
      width: 200px;
      height: 100%;
      display: flex;
      cursor: pointer;
      border-radius: 50px;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      transition: all .25s ease;

      &:hover,
      &.active {
        background-color: rgba(var(--primary-action-color), .33);
      }
    }
  }
}
</style>

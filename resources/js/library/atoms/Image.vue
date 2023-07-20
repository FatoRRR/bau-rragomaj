<template>
  <div
    role="img"
    :class="[
      'image-container',
      { 'shadow': shadow },
      { 'fullscreen': fullscreen },
      { 'clickable': fullscreenOnClick },
    ]"
    :style="{
      width: `calc(1.6 * ${size}px)`,
      height: `calc(1.6 * ${size}px)`,
      'min-width': `calc(1.6 * ${size}px)`,
      'min-height': `calc(1.6 * ${size}px)`,
      'max-width': `calc(1.6 * ${size}px)`,
      'max-height': `calc(1.6 * ${size}px)`,
    }"
    @click="$emit('click');"
  >
    <v-icon
      v-if="fullscreen"
      icon="times"
      type="filled"
      :size="24"
      class="close-fullscreen"
      @click="closeFullscreen()"
    />
    <div
      v-if="imageAvailable && src !== null && src !== ''"
      :style="imageStyles"
      class="image"
      @click.stop="displayFullscreen()"
    />
    <v-icon
      v-else
      :type="type"
      :icon="icon"
      :size="size"
    />
  </div>
</template>

<script>
import VIcon from './Icon';

export default {
  components: {
    VIcon,
  },
  props: {
    size: {
      type: Number,
      default: 36,
    },
    src: {
      type: [String, null],
      required: true,
    },
    icon: {
      type: String,
      default: 'image',
    },
    type: {
      type: String,
      default: 'filled',
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    fullscreenOnClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fullscreen: false,
      imageAvailable: false,
    };
  },
  computed: {
    imageStyles() {
      return {
        width: '100%',
        height: '100%',
        backgroundImage: `url('${this.src}')`,
      };
    },
  },
  watch: {
    src() {
      this.getImage();
    },
  },
  mounted() {
    const self = this;
    this.getImage();
    if (this.fullscreenOnClick) {
      // Close fullscreen on escape
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          self.fullscreen = false;
        }
      });

    }
  },
  methods: {
    displayFullscreen() {
      if (this.fullscreenOnClick) {
        this.fullscreen = true;
      }
    },
    closeFullscreen() {
      this.fullscreen = false;
    },
    getImage() {
      if (this.src && this.src !== '') {
        if (this.src.startsWith('data:image')) {
          this.imageAvailable = true;
        } else {
          axios.get(this.src)
            .then((response) => {
              if (response.data !== '') {
                this.imageAvailable = true;
              }
            });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.image-container {
  align-items: center;
  border-radius: 16px;
  display: inline-flex;
  justify-content: center;

  &.clickable {
    cursor: pointer;
  }

  &.shadow {
    box-shadow: $shadowColored;
  }

  &.fullscreen {
    top: 0;
    left: 0;
    z-index: 999;
    position: fixed;
    border-radius: 0px;
    align-items: center;
    justify-content: center;
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    background-color: rgba(0, 0, 0, 1);

    .close-fullscreen {
      top: 16px;
      right: 16px;
      z-index: 1000;
      cursor: pointer;
      position: fixed !important;
    }

    &.clickable {
      cursor: default;
    }

    .image {
      width: 100%;
      height: 100%;
      background-size: contain;
    }
  }

  .image {
    border-radius: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>

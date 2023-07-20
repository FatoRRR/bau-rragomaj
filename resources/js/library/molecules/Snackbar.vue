<template>
  <div
    v-show="Object.keys(snackbar).length"
    :class="[
      position,
      direction,
      'snackbar-container'
    ]"
  >
    <div class="content-container">
      <div v-if="snackbar.title" class="title">{{ snackbar.title }}</div>
      <div v-if="snackbar.subtitle" class="subtitle">{{ snackbar.subtitle }}</div>
      <div v-if="snackbar.content" class="content">{{ snackbar.content }}</div>
    </div>
    <div v-if="!snackbar.actions?.length && (!snackbar.duration || snackbar.duration === 0)" class="actions">
      <v-button
        type="text"
        @click="close()"
      >
        Schließen
      </v-button>
    </div>
    <div v-else-if="snackbar.actions?.length" class="actions">
      <v-button
        v-for="(action, index) in snackbar.actions" :key="index"
        :type="((action.type && action.type !== '') ? action.type : 'text')"
        @click="execute(action)"
      >
        {{ action.title }}
      </v-button>
    </div>
    <div
      class="progress"
      :style="`animation-duration: ${progressTime}s;`"
    ></div>
    <div class="background"></div>
  </div>
</template>

<script>
import { snackbarStore } from 'stores';
import VButton from 'library/atoms/Button';

export default {
  name: 'Snackbar',
  components: {
    VButton,
  },
  data() {
    return {
      snackbar: {},
      snackbarStore: snackbarStore(),
    }
  },
  computed: {
    progressTime() {
      if (this.snackbar.duration && this.snackbar.duration !== 0) {
        return this.snackbar.duration / 1000;
      }
      return 0;
    },
    snackbars() {
      let snackbars = this.snackbarStore.snackbars;
      return this.snackbarStore.snackbars;
    },
    position() {
      if (!this.snackbar.position) {
        return 'left';
      }
      return this.snackbar.position;
    },
    direction() {
      if (!this.snackbar.direction) {
        return 'row';
      }
      return this.snackbar.direction;
    },
  },
  watch: {
    snackbars: {
      handler(newValue, oldValue) {
        if (this.snackbars.length) {
          const snackbar = this.snackbars[0];
          this.displayNextSnackbar(snackbar);
        }
      },
      immediate:true,
      deep: true,
    }
  },
  methods: {
    execute(action) {
      action.action();
      this.close();
    },
    displayNextSnackbar(snackbar) {
      this.snackbar = snackbar;
      if (snackbar.duration && snackbar.duration !== 0) {
        window.timeout = setTimeout(() => {
          this.snackbar = {};
          this.snackbars.shift();
          if (this.snackbars.length) {
            this.displayNextSnackbar(this.snackbars[0]);
          }
        }, snackbar.duration);
      }
    },
    close() {
      this.snackbar = {};
      this.snackbars.shift();
      if (this.snackbars.length) {
        this.displayNextSnackbar(this.snackbars[0]);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$offset: 24px;
$snackbarBorderRadius: 8px;
.snackbar-container {
  gap: 8px;
  z-index: 999;
  display: flex;
  bottom: $offset;
  position: fixed;
  min-height: 48px;
  padding: 6px 16px;
  box-shadow: $shadow;
  align-items: center;
  background-color: white;
  border-radius: $snackbarBorderRadius;

  &.row {
    flex-direction: row;
  }
  &.column {
    align-items: flex-end;
    flex-direction: column;
  }
  &.left {
    left: $offset;
  }
  &.center {
    left: 50%;
    transform: translate(-50%, 0%);
  }
  &.right {
    right: $offset;
  }
  .actions {
    gap: 7px;
    display: flex;
    margin-right: -8px;
  }
  .content-container {
    .title {
      font-weight: bold;
      font-size: 1.1em;
      margin-top: 8px;
    }
    .subtitle {
      opacity: .87;
      margin-top: -4px;
      font-size: 0.87em;
    }
    .content {}
  }
  .progress {
    top: 0px;
    left: 0px;
    width: 0%;
    z-index: -1;
    height: 100%;
    position: absolute;
    transition: all .25s ease;
    animation-name: fill-progress;
    animation-fill-mode: forwards;
    border-radius: $snackbarBorderRadius;
    background-color: rgba(var(--primary-action-color), .11);
  }
  .background {
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: -1;
    height: 100%;
    position: absolute;
    border-radius: $snackbarBorderRadius;
    background-color: rgba(var(--primary-action-color), .11);
  }
}

@keyframes fill-progress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>

<template>
  <div
    ref="list"
    v-click-away="() => { $emit('close'); (type === 'context' ? deviceStore.context.item.selected = false : null) }"
    :class="[
      'list-container',
      type
    ]"
    :style="(type === 'context' ? `left: ${deviceStore.context.x}px; ${verticalPosition}: ${deviceStore.context.y}px;` : '')"
  >
    <div class="list">
      <slot />
    </div>
  </div>
</template>

<script>
import { deviceStore } from 'stores';

export default {
  name: 'List',
  props: {
    type: {
      type: String,
      default: 'list' // list, context -> for menus on right click
    }
  },
  data() {
    return {
      deviceStore: deviceStore(),
      verticalPosition: 'top',
    };
  },
  watch: {
    'deviceStore.context.y': {
      deep: true,
      immediate: true,
      handler() {
        this.setListPositions();
      }
    },
    'deviceStore.context.x': {
      deep: true,
      immediate: true,
      handler() {
        this.setListPositions();
      }
    }
  },
  mounted() {
    this.setListPositions();
  },
  methods: {
    setListPositions() {
      if (this.type === 'context' && this.$refs.list) {
        const clientWidth = this.$refs.list.clientWidth;
        const clientHeight = this.$refs.list.clientHeight;
        if (this.deviceStore.height <= this.deviceStore.context.y + clientHeight + 24) {
          this.deviceStore.context.y = this.deviceStore.context.y - clientHeight;
        }
        if (this.deviceStore.width <= this.deviceStore.context.x + clientWidth + 24) {
          this.deviceStore.context.x = this.deviceStore.context.x - clientWidth;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.list-container {
  z-index: 3;
  padding: 4px;

  &.context {
    position: fixed;
  }

  .list {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15);
    background-color: $secondaryColor;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 4px;
    max-height: 100%;
    overflow: scroll;
    padding: 8px 0px;
    display: flex;
    flex-grow: 0;
    z-index: 2;
    flex: none;
    order: 0;
  }
}
</style>

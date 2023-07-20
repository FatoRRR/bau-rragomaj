<template>
  <div
    class="badge-container"
  >
    <slot />
    <div
      v-if="badge !== 0 || type !== 'text'"
      :style="{
        'bottom': (bottom ? '-6px' : null),
        'top': (bottom ? 'unset' : null),
        'right': (left ? 'unset' : null),
        'left': (left ? '-6px' : null),
      }"
      class="badge"
    >
      <template v-if="badge !== 0 || type === 'text'">
        {{ badge }}
      </template>
      <div
        class="badge-background"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    badge: {
      type: Number,
      default: 0,
    },
    // positioning for fab buttons
    bottom: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text' // text, color,
    },
  },
};
</script>

<style lang="scss">
.badge-container {
  position: relative;

  .badge {
    color: $primaryActionColor;
    justify-content: center;
    border-radius: 50px;
    align-items: center;
    position: absolute;
    font-size: .8em;
    display: flex;
    height: 20px;
    right: -6px;
    width: 20px;
    top: -6px;

    .badge-background {
      background-color: rgba($color: $primaryActionColor, $alpha: .11);
      border-radius: 50px;
      position: absolute;
      height: 20px;
      width: 20px;
      right: 0px;
      top: 0px;
    }
  }

}
</style>

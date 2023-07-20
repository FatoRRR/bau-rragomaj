<template>
  <div
    class="tooltip"
    @mouseover="positionTooltip"
  >
    <slot />
    <span
      :ref="'tooltip'"
      class="text"
      :class="{
        'left': (!right && !top && left),
        'right': (!left && !top && right),
        'top': (!left && !right && top),
        'bottom': (!top && !right && !left && bottom),
      }"
    >{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    title: {
      type: String,
      default: '',
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    positionTooltip(event) {
      if (!this.top && !this.bottom && !this.left && !this.right) {
        this.$refs.tooltip.style.position = 'fixed';
        this.$refs.tooltip.style.transform = 'scale(1)';
        this.$refs.tooltip.style.top = `${event.clientY + 16}px`;
        this.$refs.tooltip.style.left = `${event.clientX - 34}px`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.tooltip {
  width: fit-content;
  position: relative;
  display: inline-flex;
}

.tooltip .text {
  visibility: hidden;
  width: fit-content;
  max-height: 52px;
  background-color: #616161e6;
  display: flex;
  z-index: 1;
  color: #fff;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  position: absolute;
  align-items: center;
  transform: scale(0);
  justify-content: center;
  transition: all 0.075s ease-in;
  @media (min-width: 1200px) {
    font-size: 10px;
  }

  &.left {
    right: 100%;
    top: 50%;
    transform: translateY(-50%) scale(1);
  }

  &.right {
    left: 100%;
    top: 50%;
    transform: translateY(-50%) scale(1);
  }

  &.top {
    left: -50%;
    bottom: 100%;
    transform: translateY(-25%) scale(1);
  }

  &.bottom {
    left: -50%;
    top: 100%;
    transform: translateY(-25%) scale(1);
  }
}

.tooltip:hover .text {
  visibility: visible;
}
</style>

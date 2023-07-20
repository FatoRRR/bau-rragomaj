<template>
  <div
    v-ripple="rippleEffect"
    role="img"
    :class="[
      'icon-container',
      type,
      { 'active': active },
  { 'clickable': clickable }
    ]"
    :style="`
          height: calc(1.6 * ${size}px);
          width: calc(1.6 * ${size}px);
          min-height: calc(1.6 * ${size}px);
          min-width: calc(1.6 * ${size}px);
          max-height: calc(1.6 * ${size}px);
          max-width: calc(1.6 * ${size}px);
          font-size: ${size}px;
          color: ${color};`"
  >
    <font-awesome-icon
      v-if="icon !== null && icon !== ''"
      :icon="iconName"
      class="icon"
    />
    <div class="slot">
      <slot />
    </div>
    <div class="background" />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24,
    },
    icon: {
      type: [String, Array],
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'plain', // plain, filled, primary
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      const icon = this.icon;
      if (icon.includes('fab-') || icon.includes('far-')) {
        return [
          icon.split('-')[0],
          icon.split('-')[1]
        ];
      }
      return icon;
    },
    rippleEffect() {
      if (this.clickable) {
        return 'rgba(0, 0, 0, 0.35)';
      }
      return 'rgba(0, 0, 0, 0)';
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-container {
  position: relative;
  border-radius: 16px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  transition: all .25s ease;
  box-shadow: $shadowColored;
  color: $primaryActionColor;
  background-color: transparent;

  .icon {
    z-index: 1;
  }

  .slot {
    font-size: .7em;
    z-index: 1;
    width: 0px;
  }

  .background {
    background-color: transparent;
    transition: all .25s ease;
    border-radius: 16px;
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    left: 0px;
    top: 0px;
  }

  &.clickable {
    cursor: pointer;

    &.active {
      .background {
        opacity: .11;
        background-color: $primaryActionColor;
      }
    }

    &:hover {
      .background {
        opacity: .067;
        background-color: $primaryActionColor;
      }
    }
  }

  &.filled {
    .background {
      opacity: .11;
      background-color: $primaryActionColor;
    }
  }

  &.primary {
    color: $secondaryColor;

    .background {
      opacity: .87;
      background-color: $primaryActionColor;
    }

    &.clickable {
      &:hover {
        .background {
          opacity: .67;
        }
      }
    }
  }

  &.plain {
    box-shadow: unset;
  }
}
</style>

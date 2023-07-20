<template>
  <button
    v-ripple="rippleEffect"
    :class="[
      type,
      'vue-button',
      { 'disabled': disabled }
    ]"
    :style="{
      'top': (top ? '24px' : null),
      'left': (left ? '24px' : null),
      'right': (left ? 'unset' : null),
      'width': (size === 'small' ? '40px' : (size === 'big' ? '96px' : null)),
      'height': (size === 'small' ? '40px' : (size === 'big' ? '96px' : null))
    }"
  >
    <slot />
    <loading-indicator
      v-if="loading"
      :size="18"
    />
    <div class="fab-background" />
  </button>
</template>

<script>
import LoadingIndicator from 'library/atoms/LoadingIndicator.vue';

export default {
  name: 'Button',
  components: {
    LoadingIndicator,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // positioning for fab buttons
    top: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    // size for fab buttons
    // available sizes: small, medium, big
    size: {
      type: String,
      defult: 'medium',
    },
    // available types: filled, outlined, text, fab
    type: {
      type: String,
      default: 'filled',
    },
  },
  computed: {
    rippleEffect() {
      if (!this.disabled) {
        return 'rgba(0, 0, 0, 0.35)';
      }
      return 'rgba(0, 0, 0, 0)';
    },
  },
};
</script>

<style lang="scss">
.vue-button {
  gap: 14px;
  height: 40px;
  display: flex;
  cursor: pointer;
  padding: 0px 16px;
  white-space: nowrap;
  align-items: center;
  border-radius: 50px;
  flex-direction: row;
  color: $secondaryColor;
  justify-content: center;
  transition: all .25s ease;
  background-color: $primaryActionColor;

  .fab-background {
    display: none;
  }

  &.outlined,
  &.filled,
  &.text {

    i,
    svg {
      color: $secondaryColor;
      width: 18px !important;
      height: 18px !important;
    }

    i:nth-child(1) {
      margin-right: 10px;
    }

    i:nth-child(3) {
      margin-left: 10px;
    }
  }

  &.filled {
    &:hover {
      background-color: rgba($color: $primaryActionColor, $alpha: .87);
    }
  }

  &.outlined {
    background-color: $primaryBackgroundColor;
    border: 1px solid $primaryActionColor;
    color: $primaryActionColor;

    i,
    svg {
      width: 18px !important;
      height: 18px !important;
      color: $primaryActionColor;
    }
  }

  &.text {
    background-color: transparent;
    color: $primaryActionColor;

    i,
    svg {
      width: 18px !important;
      height: 18px !important;
      color: $primaryActionColor;
    }
  }

  &:hover {
    background-color: rgba($color: $primaryActionColor, $alpha: .11);
  }

  &.fab {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
    background-color: $primaryBackgroundColor;
    color: $primaryActionColor;
    position: fixed !important;
    border-radius: 16px;
    position: relative;
    bottom: 24px;
    height: 56px;
    width: 56px;
    right: 24px;
    z-index: 10;

    .fab-background {
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      border-radius: 16px;
      background-color: rgba($color: $primaryActionColor, $alpha: .11);
      transition: all .25s ease;
    }

    &:hover {
      .fab-background {
        background-color: rgba($color: $primaryActionColor, $alpha: .16);
      }
    }

    i,
    svg {
      width: 20px !important;
      height: 20px !important;
    }
  }

  &.disabled:hover,
  &.disabled {
    cursor: not-allowed;
    background-color: rgba(0, 0, 0, .17);
  }
}
</style>

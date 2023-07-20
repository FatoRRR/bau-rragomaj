<template>
  <div
    :style="`border-radius: ${borderRadius}px;`"
    class="chip-container"
    :class="{
      'disabled': disabled,
      'active': active
    }"
    @click="click"
  >
    <span
      class="chip-background-color"
      :style="`border-radius: ${borderRadius}px;`"
    />
    <div
      v-if="icon !== '' || loading"
      class="chip-icon-container"
    >
      <v-loading
        v-if="loading"
        :size="18"
      />
      <v-icon
        v-else
        :size="16"
        :icon="icon"
        class="chip-icon"
      />
    </div>
    <div class="chip-name">
      <slot />
    </div>
    <v-icon
      v-if="removable"
      v-ripple
      class="chip-icon-remove"
      icon="times-circle"
      :size="16"
      @click="$emit('remove', element)"
    />
  </div>
</template>

<script>
import VIcon from './Icon';
import VLoading from './LoadingIndicator';

export default {
  name: 'Chip',
  components: {
    VIcon,
    VLoading,
  },
  props: {
    element: {
      type: Object,
      default: () => {},
    },
    borderRadius: {
      type: Number,
      default: 50,
    },
    removable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    click() {
      if (!this.disabled) {
        this.$emit('click', this.element);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.chip-container {
  color: $chipColorPrimary;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  user-select: none;
  font-weight: 500;
  height: 32px;

  .chip-background-color {
    width: 100%;
    height: 100%;
    opacity: .12;
    position: absolute;
    box-sizing: border-box;
    transition: all .25s ease;
    background-color: $chipBackgroundColor;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  }

  &.disabled {
    opacity: .6;
    cursor: not-allowed;
  }

  &.active {
    .chip-background-color {
      opacity: .22;
      border-color: $chipActiveBorderColor;
      background-color: $chipActiveBackgroundColor;
    }
  }

  &.chip-outlined {
    .chip-background-color {
      background-color: transparent;
      border: 1px solid $chipBorderColor;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    }

    &.disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    &.active {
      .chip-background-color {
        opacity: .57;
        border-color: $chipActiveBorderColor;
      }
    }

    .chip-icon-remove {
      opacity: .6;
    }
  }

  .chip-icon-container {
    width: 24px;
    height: 24px;
    display: flex;
    margin-left: 4px;
    margin-right: -8px;
    align-items: center;
    border-radius: 50px;
    box-sizing: border-box;
    justify-content: center;

    .chip-icon {
      opacity: .8;
    }

    svg {
      min-width: 14px;
      min-height: 14px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50px;
    }
  }

  .chip-name {
    opacity: .9;
    font-size: 0.9rem;
    margin-left: 12px;
    margin-right: 12px;
    text-transform: capitalize;
  }

  .chip-icon-remove {
    width: 16px;
    opacity: .8;
    height: 16px;
    display: flex;
    cursor: pointer;
    margin-right: 8px;
    margin-left: -2px;
    transition: all .18s ease;

    svg {
      width: 100%;
    }

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>

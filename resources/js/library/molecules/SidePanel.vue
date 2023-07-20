<template>
  <div :class="[
    'side-panel-container',
    { 'active': modelValue },
    { 'inactive': !modelValue }
  ]">
    <div
      v-on-clickaway="() => { updateValue(false) }"
      :class="[
        'side-panel',
        { 'active': modelValue },
        { 'inactive': !modelValue }
      ]"
    >
      <div class="title-container">
        <div class="title">
          {{ title }}
        </div>
        <icon
          icon="times"
          variant="action"
          @click="updateValue(false)"
        />
      </div>
      <div class="side-panel-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue3-click-away';
import Icon from 'library/atoms/Icon';

export default {
  name: 'SidePanel',
  components: {
    Icon,
  },
  directives: {
    onClickaway,
  },
  props: {
    title: {
      type: String,
      default: 'Filter',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 320px;

.side-panel-container {
  top: 0px;
  left: 0px;
  z-index: 9;
  opacity: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  backdrop-filter: blur(2px) opacity(0);

  &.active {
    animation-fill-mode: forwards;
    animation-duration: .25s;
    animation-name: blurIn;
  }

  &.inactive {
    animation-fill-mode: forwards;
    animation-duration: .25s;
    animation-name: blurOut;
  }

  .side-panel {
    top: 0px;
    width: 0px;
    height: 100%;
    right: -$width;
    display: flex;
    padding: 24px;
    z-index: 99999;
    position: fixed;
    box-sizing: border-box;
    flex-direction: column;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    background-color: $primaryBackgroundColor;
    box-shadow: $shadow;

    &.active {
      width: $width;
      animation-fill-mode: forwards;
      animation-duration: .25s;
      animation-name: slideIn;
    }

    &.inactive {
      animation-fill-mode: forwards;
      animation-duration: .25s;
      animation-name: slideOut;
    }

    .title-container {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      justify-content: space-between;

      .title {
        font-size: 1.1em;
        letter-spacing: 1px;
      }
    }

    .side-panel-content {
      gap: 14px;
      display: flex;
      flex-direction: column;
    }
  }
}

@keyframes slideIn {
  1% {
    right: -$width;
  }

  100% {
    right: 0px;
  }
}

@keyframes slideOut {
  1% {
    right: 0px;
  }

  100% {
    right: -$width;
  }
}

@keyframes blurIn {
  0% {
    backdrop-filter: blur(2px) opacity(0);
  }

  100% {
    backdrop-filter: blur(2px) opacity(1);
  }
}

@keyframes blurOut {
  0% {
    backdrop-filter: blur(2px) opacity(1);
  }

  100% {
    backdrop-filter: blur(2px) opacity(0);
    left: 100%;
  }
}
</style>

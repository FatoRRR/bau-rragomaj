<template>
  <div
    :class="[
      { 'maximize': maximize },
      { 'blurred': blurred },
      { 'shadow': shadow },
      'card',
      type
    ]"
  >
    <div
      v-if="slotContentAvailable('title') || slotContentAvailable('subtitle')"
      class="card-header"
    >
      <div class="card-title">
        <slot name="title" />
      </div>
      <div class="card-subtitle">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="card-content">
      <slot />
    </div>
    <div
      v-if="slotContentAvailable('actions')"
      class="card-actions"
    >
      <slot name="actions" />
    </div>
    <div class="card-background"/>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    shadow: {
      type: Boolean,
      default: false,
    },
    blurred: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'plain', // plain, filled
    },
    maximize: { // maximize card
      type: Boolean,
      default: false,
    },
  },
  methods: {
    slotContentAvailable(slotName) {
      return !!this.$slots[slotName];
    },
  },
};
</script>

<style lang="scss" scoped>

.card {
    background-color: $primaryBackgroundColor;
    box-sizing: content-box;
    flex-direction: column;
    border-radius: 28px;
    position: relative;
    max-height: 90%;
    max-width: 90%;
    display: flex;
    padding: 24px;
    z-index: 0;
    gap: 14px;
    &.maximize {
      width: 100%;
      height: 100%;
    }

    &.shadow {
      box-shadow: $shadow;
    }

    .card-header {
      .card-title {
        gap: 14px;
        display: flex;
        font-size: 1.4em;
        align-items: center;
      }
      .card-subtitle {
        gap: 14px;
        opacity: .87;
        display: flex;
        font-size: 1em;
        align-items: center;
      }
    }

    .card-content {
      flex-direction: column;
      overflow-y: scroll;
      display: flex;
      padding: 7px;
      gap: 14px;
      flex: 1;
    }

    .card-actions {
      gap: 14px;
      display: flex;
      justify-content: flex-end;
      button {
        margin: 0px 7px;
      }
    }

    .card-background {
      background-color: white;
      border-radius: 28px;
      position: absolute;
      height: 100%;
      z-index: -1;
      width: 100%;
      left: 0px;
      top: 0px;
    }
    &.filled {
      box-shadow: $shadowColored;
      .card-background {
        background-color: rgba($color: $primaryActionColor, $alpha: .11);
      }
    }
    &.blurred {
      -webkit-backdrop-filter: blur(6px) opacity(1);
      backdrop-filter: blur(6px) opacity(1);
      background-color: transparent;
      .card-background {
        background-color: rgba($color: white, $alpha: .11);
      }
      &.filled {
        box-shadow: $shadowColored;
        .card-background {
          background-color: rgba($color: $primaryActionColor, $alpha: .11);
        }
      }
    }
  }
</style>

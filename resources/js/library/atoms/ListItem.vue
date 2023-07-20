<template>
  <div
    v-ripple="rippleEffect"
    :class="{
      'list-item': true,
      'clickable': clickable
    }"
  >
    <div class="icon">
      <slot name="icon" />
    </div>
    <div class="list-item-title-container">
      <div class="title">
        <slot name="title" />
      </div>
      <div class="subtitle">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="command">
      <slot name="command" />
    </div>
    <div class="list-item-background" />
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    clickable: {
      type: Boolean,
      default: false,
    },
    divider: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
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
.list-item {
  box-sizing: border-box;
  align-items: center;
  position: relative;
  user-select: none;
  padding: 7px 12px;
  color: #49454F;
  display: flex;
  width: 100%;
  z-index: 3;
  gap: 14px;

  .list-item-title-container {
    .title {
      display: flex;
      font-size: 1em;
      font-weight: normal;
      align-items: center;
    }
    .subtitle {
      font-weight: lighter;
      align-items: center;
      font-size: .87em;
      opacity: .87em;
      display: flex;
    }
  }
  .icon {
    display: flex;
    align-items: center;
  }
  .command {
    opacity: .87;
    color: #49454F;
    margin-left: auto;
  }
  .list-item-background {
    background-color: $secondaryColor;
    transition: all .25s ease;
    position: absolute;
    opacity: .11;
    height: 100%;
    z-index: -1;
    width: 100%;
    left: 0px;
    top: 0px;
  }
  &.clickable {
    cursor: pointer;
    &:hover {
      .list-item-background {
        background-color: $primaryColor;
      }
    }
  }
}
</style>

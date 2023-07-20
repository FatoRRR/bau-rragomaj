<template>
  <div class="switch-container">
    <div :class="[
      'switch',
      { 'active': value }
    ]">
      <input
        :id="key"
        v-model="value"
        type="checkbox"
      >
      <label :for="key">
        <slot />
      </label>
      <div :class="[
        'background',
        { 'active': value }
      ]" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    modelValue: {
      type: [Boolean, String],
      default: false,
      required: true,
    },
  },
  data() {
    return {
      key: '',
    };
  },
  computed: {
    value: {
      get() {
        if (typeof this.modelValue === 'string') {
          return this.modelValue === 'true' || this.modelValue === '1';
        }
        return this.modelValue;
      },
      set(value) {
        this.$emit('change', value);
        this.$emit('update:modelValue', value);
      },
    },
  },
  created() {
    // eslint-disable-next-line
    this.key = '_' + Math.random().toString(36).substr(2, 9);
  },
};
</script>

<style lang="scss" scoped>
$inactive: rgba(73, 69, 79, 0.16);
$inactive: rgba($color: $primaryActionColor, $alpha: .11);
$height: 32px;
$width: 52px;

.switch-container {
  display: flex;
  align-items: center;

  .switch {
    width: $width;
    display: flex;
    height: $height;
    font-size: 16px;
    position: relative;
    border-radius: 50px;
    transition: all 0.28s cubic-bezier(.4, 0, .2, 1);

    &::before {
      top: 18%;
      opacity: 0;
      z-index: 3;
      width: 5px;
      right: 14px;
      content: '';
      height: 10px;
      position: absolute;
      border: solid $primaryActionColor;
      transform: rotate(45deg) translate(50%);
      border-width: 0 3px 3px 0;
      transition: all 0.28s cubic-bezier(.4, 0, .2, 1);

    }

    &.active {
      border-color: transparent;

      &::before {
        opacity: 1;
      }

      &:after {
        z-index: 2;
        content: '';
        width: 22px;
        height: 22px;
        display: flex;
        position: absolute;
        align-items: center;
        border-radius: 50px;
        top: calc(100% - 27px);
        justify-content: center;
        background-color: white;
        color: $primaryActionColor;
        left: calc(100% - 24px - 2px);
      }
    }

    &:after {
      left: 8px;
      z-index: 2;
      width: 16px;
      content: '';
      height: 16px;
      position: absolute;
      border-radius: 50px;
      top: calc(100% - 24px);
      background-color: $inactive;
      transition-property: left, background-color;
      transition: all 0.28s cubic-bezier(.4, 0, .2, 1);
    }

    .background {
      top: 0px;
      left: 0px;
      z-index: 1;
      width: 100%;
      height: 100%;
      opacity: .11;
      cursor: pointer;
      position: absolute;
      border-radius: 50px;
      transition: all .25s ease;
      background-color: $primaryActionColor;

      &.active {
        opacity: 1;
      }
    }

    label {
      margin: auto;
      display: block;
      cursor: pointer;
      user-select: none;
      padding: 0 0 0 58px;
      white-space: nowrap;
    }

    input {
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 5;
      margin: 0px;
      width: 100%;
      height: 100%;
      cursor: pointer;
      position: absolute;
    }
  }
}
</style>

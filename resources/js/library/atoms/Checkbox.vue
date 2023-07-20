<template>
  <div
    class="material-checkbox"
    @click="changeValue()"
  >
    <div
      v-ripple
      class="checkbox"
    >
      <input
        type="checkbox"
        :checked="modelValue"
      >
      <div class="checkbox" />
    </div>
    <span><slot /></span>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeValue() {
      this.$emit('update:modelValue', !this.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>

.material-checkbox {
  display: flex;
  color: $primaryColor;
  user-select: none;
  align-items: center;
  div.checkbox {
    width: 40px;
    height: 40px;
    display: flex;
    cursor: pointer;
    align-items: center;
    border-radius: 50px;
    box-sizing: border-box;
    justify-content: center;

    input {
      display: none;
      &~.checkbox {
        width: 20px;
        height: 20px;
        min-width: 20px;
        min-height: 20px;
        position: relative;
        border-radius: 4px;
        box-sizing: border-box;
        transition: all .25s ease;
        background-color: transparent;
        border: 2px solid $checkboxColorPrimary;
      }
      &:checked ~.checkbox {
        background-color: $checkboxColorPrimary;
        &:after {
          top: -3px;
          left: 1px;
          width: 5px;
          content: '';
          height: 10px;
          position: absolute;
          border: solid $checkboxSecondaryColor;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg) translate(50%);
        }
      }
    }
  }
  span {
    cursor: pointer;
  }
}
</style>

<template>
  <div class="radio-buttons">
    <div
      v-for="(option, index) in modelValue"
      :key="key + '' + option.text"
      class="radio"
    >
      <input
        :id="'radio' + index + key"
        type="radio"
        :name="'radio' + key"
        class="radio__input"
        :checked="option.value"
        @input="update(option)"
      >
      <label
        :for="'radio' + index + key"
        class="radio__label"
      >{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Radiobuttons',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      key: '',
    };
  },
  created() {
    this.key = `_${Math.random().toString(36).substr(2, 9)}`;
  },
  methods: {
    update(index) {
      const newValues = this.modelValue;
      for (let i = 0; i < newValues.length; i += 1) {
        if (i === index) {
          newValues[i].value = true;
        } else {
          newValues[i].value = false;
        }
      }
      this.$emit('input', newValues);
      this.$emit('change', newValues);
      this.$emit('update:getValue', { ...newValues[index], index });
    },
  },
};
</script>

<style lang="scss">

// Variables
$border-color: rgba(0, 0, 0 , .54);
$accent-color: $blue;

.radio-buttons {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

// Radio
.radio {
  display: inline-block;
  position: relative;
  font-size: 16px;
  line-height: 24px;

  &__input {
    position: absolute;
    top: 4px;
    left: 0;
    width: 36px;
    height: 20px;
    opacity: 0;
    z-index: 0;
  }

  // Unchecked
  &__label {
    display: block;
    padding: 0 0 0 24px;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: 4px;
      left: 0;
      width: 16px;
      height: 16px;
      background-color: transparent;
      border: 2px solid $border-color;
      border-radius: 14px;
      z-index: 1;
      transition: border-color 0.28s cubic-bezier(.4, 0, .2, 1);
    }

    &:after {
      content: '';
      position: absolute;
      top: 8px;
      left: 4px;
      width: 8px;
      height: 8px;
      background-color: $accent-color;
      border-radius: 50%;
      z-index: 2;
      transform: scale(0, 0);
      transition: transform 0.28s cubic-bezier(.4, 0, .2, 1);
    }
  }

  // Checked
  &__input:checked + &__label {
    &:before {
      border-color: $accent-color;
    }

    &:after {
      transform: scale(1, 1);
    }
  }
}
</style>

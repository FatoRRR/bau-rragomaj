<template>
  <div
    :ref="'input-container'"
    :class="{
      'disabled': disabled,
      'input-container': true,
    }"
    :style="`
      width: ${(width != '' ? width : 'unset')};
      max-width: ${(width != '' ? width : 'unset')};
    `"
  >
    <input type="hidden" :name="label" :v-model="value">
    <div class="input-icon left">
      <icon
        v-if="icon !== ''"
        :icon="icon"
        :size="18"
        @click.prevent="$emit('click:icon')"
      />
    </div>
    <input
      v-if="type !== 'textarea'"
      :id="key"
      v-model="value"
      v-ripple
      :name="label"
      :type="type"
      class="input"
      :disabled="disabled"
      :autofocus="autofocus"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :class="{
        'active': modelValue !== '',
        'padding-left': icon !== '',
        'input-date': type === 'date',
        'input-color': type === 'color',
        'input-search': type === 'search',
      }"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @keydown.enter="$emit('keydown.enter')"
      @input="$emit('update:modelValue', $event.target.value), $emit('input', $event.target.value), $emit('change', $event.target.value)"
    >
    <textarea
      v-else
      :id="key"
      v-model="value"
      class="textarea"
      :disabled="disabled"
      :autofocus="autofocus"
      :class="{
        'active': modelValue !== '',
      }"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @keydown.enter="$emit('keydown.enter')"
      @input="$emit('update:modelValue', $event.target.value), $emit('input', $event.target.value), $emit('change', $event.target.value)"
    />
    <div
      :class="{
        'input-border': true,
        'active': modelValue !== '',
      }"
    >
      <div class="input-border-left" />
      <div
        class="label-container"
        :style="{'min-width': `${labelWidth}px` }"
      >
        <label
          :ref="'input-label'"
          :class="{
            'input-label': true,
            'required': required,
            'input-with-icon': icon !== '',
            'input-label-active': modelValue !== ''
          }"
          :for="key"
        >
          {{ placeholder }}
        </label>
      </div>
      <div class="input-border-right" />
    </div>
    <icon
      v-if="appendIcon !== ''"
      :size="18"
      :clickable="true"
      :icon="appendIcon"
      class="input-icon right"
      @click.prevent="$emit('click:append-icon')"
    />
    <icon
      v-else-if="type === 'search' || type === 'date'"
      :icon="type === 'search' ? 'search' : 'calendar'"
      class="input-icon right"
      :size="18"
    />
    <div
      v-if="hint !== '' || error !== '' || limit !== 0"
      class="input-optional"
    >
      <div
        v-if="hint !== '' && error === ''"
        class="input-hint"
      >
        {{ hint }}
      </div>
      <div
        v-if="error !== ''"
        class="input-error"
      >
        {{ error }}
      </div>
      <div
        v-if="limit !== 0"
        :class="{'input-limit': true, 'input-limit-reached': modelValue.length > limit}"
      >
        {{ modelValue.length }} / {{ limit }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'MaterialInput',
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    width: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    autocomplete: {
      type: Boolean,
      default: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: [String, Array],
      default: '',
    },
    appendIcon: {
      type: [String, Array],
      default: '',
    },
  },
  data() {
    return {
      key: '',
      value: this.modelValue,
    };
  },
  computed: {
    labelWidth() {
      if (this.placeholder !== '') {
        console.log(this.key);
        if (this.$refs['input-label']) {
          console.log(this.key);
          return this.$refs['input-label'].offsetWidth;
        }
      }
      return 0;
    },
  },
  watch: {
    value() {
      this.$emit('update:modelValue', this.value);
    },
    modelValue() {
      this.value = this.modelValue;
    },
  },
  mounted() {
    if (this.$refs['input-container'].id) {
      this.key = `_${this.$refs['input-container'].id}`;
    } else {
      this.key = `_${Math.random().toString(36).substr(2, 9)}`;
    }
  },
};
</script>

<style lang="scss" scoped>
$height: 46px;

.input-container {
  flex: 1;
  margin: 7px 0px;
  position: relative;
  color: $inputFontColor;

  textarea,
  input {
    z-index: 1;
    width: 100%;
    border: none;
    outline: none;
    height: $height;
    font-size: 1.2em;
    position: relative;
    color: $inputFontColor;
    box-sizing: border-box;
    padding: 12px 16px 10px;
    font-family: $fontFamily;
    transition: all 0.15s ease;
    background-color: transparent;

    &.input-date,
    &.input-search {
      padding-right: 48px;
    }
    &.padding-left {
      padding-left: 48px;
    }
  }

  textarea {
    min-height: 140px;
  }

  .input-icon {
    top: 6px;
    display: flex;
    transform: translateY(10%);
    position: absolute !important;
    &.right {
      right: 7px;
      z-index: 9;
    }
    &.left {
      left: 7px;
      margin-right: 40px;
    }
  }

  // stylings for border and label
  .input-border {
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 0;
    opacity: 1;
    display: flex;
    height: $height;
    position: absolute;
    border-radius: 3px;
    box-sizing: border-box;
    transition: all .24 ease;

    .input-border-left {
      width: 14px;
      height: 100%;
      border-style: solid;
      box-sizing: border-box;
      border-top-left-radius: 3px;
      border-width: 1px 0px 1px 1px;
      border-bottom-left-radius: 3px;
      border-color: $inputBorderColor;
    }
    .label-container {
      height: 100%;
      font-size: .9em;
      width: fit-content;
      border-style: solid;
      box-sizing: border-box;
      border-width: 1px 0px 1px 0px;
      border-color: $inputBorderColor;
    }
    .input-border-right {
      width: 100%;
      height: 100%;
      border-style: solid;
      box-sizing: border-box;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-width: 1px 1px 1px 0px;
      border-color: $inputBorderColor;
    }
  }

  textarea:hover +.input-border:not(.active),
  input:hover +.input-border:not(.active) {
    opacity: .8;
  }
  textarea:focus + .input-border,
  input:focus + .input-border,
  .input-border.active {
    .input-border-left,
    .input-border-right,
    .label-container {
      border-color: $inputActiveBorderColor;
    }
    .label-container {
      border-width: 0px 0px 1px 0px;
    }
  }

  .input-label {
    top: 0px;
    z-index: 0;
    display: flex;
    height: $height;
    font-size: .9em;
    padding: 0px 7px;
    user-select: none;
    position: absolute;
    align-items: center;
    color: $inputFontColor;
    transition: all 0.15s ease;
    background-color: transparent;

    &.required {
      &::before {
        color: $red;
        content: "*";
        margin: 0px 3px;
        font-size: 1.4em;
      }
    }
    &.input-with-icon {
      left: 40px;
    }
  }

  textarea:focus + .input-border label,
  input:focus + .input-border label,
  .input-label.input-label-active {
    left: unset;
    height: unset;
    font-size: .9em;
    padding-left: 7px;
    transform: translateY(-50%);
    color: $inputActiveBorderColor;
  }

  // when element is disabled
  &.disabled {
    input {
      opacity: 0.7;
      cursor: not-allowed;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  // stylings for error text and limiter
  .input-optional {
    display: flex;
    font-size: .8rem;
    margin: .4em 1em;
    .input-hint {
      opacity: .87;
    }


    .input-limit-reached,
    .input-error {
      color: $red;
      word-break: break-word;
    }

    .input-limit {
      margin-left: auto;
      white-space: nowrap;
      color: $inputFontColor;
      transition: color .25s ease;
    }
  }
}
input[type="date"] {
  &::-webkit-calendar-picker-indicator,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    visibility: hidden;
    display: none;
  }
}

// clears the 'x'
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>

<template>
  <div
    :id="key"
    v-click-away="() => { displaySelectOptions = false }"
    class="select-container"
    :v-ripple="(displaySelectOptions === false)"
    :style="`width: ${(width != '' ? width : '100%')}; max-width: ${(width != '' ? width : '100%')};`"
  >
    <v-input
      v-model="search"
      :width="width"
      :disabled="disabled"
      :placeholder="placeholder"
      :append-icon="(displaySelectOptions ? 'caret-up' : 'caret-down')"
      @keydown.esc="deselect()"
      @click="(!disabled && !displaySelectOptions ? (displayAllOptionsOnClick = true, displaySelectOptions = true) : null)"
    />
    <!-- Options -->
    <v-list
      v-if="displaySelectOptions"
      class="select-list"
    >
      <v-list-item
        v-for="(option, index) in options"
        :key="index"
        @click="select(option)"
      >
        <template #title>
          {{ option[objectKey] }}
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import VInput from './Input';
import VListItem from './ListItem';
import VList from '../molecules/List';

export default {
  name: 'VSelect',
  components: {
    VList,
    VInput,
    VListItem,
  },
  props: {
    placeholder: {
      required: true,
      type: String,
    },
    width: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    objectKey: {
      type: String,
      default: 'text',
    },
    activeOption: {
      type: Object,
      default: () => { },
    },
    alwaysShowOptions: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      key: '',
      value: '',
      search: '',
      displaySelectOptions: false,
      displayAllOptionsOnClick: false,
    };
  },
  computed: {
    selectedOption() {
      return this.modelValue.find((option) => {
        if (option.value) {
          return option;
        }
      });
    },
    options() {
      let options = this.modelValue;
      if (this.search !== '' && !this.displayAllOptionsOnClick) {
        options = options.filter((element) => {
          if (element[this.objectKey].toLowerCase().includes(this.search.toLowerCase())) {
            return element;
          }
        });
      }
      return options;
    },
  },
  watch: {
    activeOption: {
      immediate: true,
      deep: true,
      handler() {
        if (this.activeOption && this.modelValue.length) {
          const key = Object.keys(this.activeOption)[0];
          const value = Object.values(this.activeOption)[0];

          let selectedOption = {};
          const options = this.modelValue;
          for (let i = 0; i < this.modelValue.length; i += 1) {
            const element = this.modelValue[i];
            if (element[key] === value) {
              options[i].value = true;
              selectedOption = element;
            } else {
              options[i].value = false;
            }
          }
          this.search = selectedOption[this.objectKey];
          this.$emit('select', selectedOption);
          this.$emit('update:modelValue', options);
        } else if (this.modelValue.length) {
          const selectedOption = this.modelValue.find((option) => option.value);
          if (!selectedOption) {
            this.search = this.modelValue[0][this.objectKey];
            this.$emit('select', this.modelValue[0]);
          } else {
            this.search = selectedOption[this.objectKey];
            this.$emit('select', selectedOption);
          }
        }
      },
    },
    search() {
      this.displayAllOptionsOnClick = false;
      if (this.search !== '') {
        this.displaySelectOptions = true;
      } else {
        this.deselect();
      }
    },
  },
  methods: {
    deselect() {
      if (this.selectedOption) {
        this.selectedOption.value = false;
      }
      this.search = '';
      this.displaySelectOptions = false;
    },
    select(option) {
      const options = this.modelValue;
      for (let i = 0; i < this.modelValue.length; i += 1) {
        const element = this.modelValue[i];
        if (element[this.objectKey] === option[this.objectKey]) {
          options[i].value = true;
        } else {
          options[i].value = false;
        }
      }
      this.search = option[this.objectKey];
      this.$emit('select', option);
      this.$emit('update:modelValue', options);
      this.displaySelectOptions = false;
    },
  },
};
</script>

<style lang="scss">
$height: 48px;

.select-container {
  position: relative;
  height: $height;
  cursor: pointer;

  .select-list {
    position: absolute;
    max-height: 200px;
    overflow: scroll;
    width: 100%;
    top: 100%;
  }
}
</style>

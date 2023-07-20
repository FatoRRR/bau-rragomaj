<template>
  <div v-show="active">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    number: {
      type: Number,
      required: true,
    },
    initial: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      finished: false,
      active: false,
    };
  },
  created() {
    this.$parent.steps.push(this);
  },
  methods: {
    emitSelect() {
      this.$emit('select');
    },
  },
};
</script>

<style lang="scss">

</style>

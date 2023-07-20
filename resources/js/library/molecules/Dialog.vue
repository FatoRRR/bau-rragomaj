<template>
  <div
    v-if="modelValue"
    class="dialog-container"
    @click.self="$emit('update:modelValue', !modelValue)"
  >
    <card

      :maximize="maximize"
      :shadow="shadow"
      :type="type"
    >
      <template #title>
        <slot name="title" />
      </template>
      <template #subtitle>
        <slot name="subtitle" />
      </template>
      <slot />
      <template #actions>
        <slot name="actions" />
      </template>
    </card>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'Dialog',
  components: {
    Card,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    maximize: { // maximize card inside dialog
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'plain', // plain, filled
    },
  },
};
</script>

<style lang="scss">
.dialog-container {
  background-color: rgba(0, 0, 0, 0.67);
  justify-content: center;
  z-index: $zIndexDialog;
  align-items: center;
  position: fixed;
  display: flex;
  height: 100vh;
  width: 100vw;
  left: 0px;
  top: 0px;
}
</style>

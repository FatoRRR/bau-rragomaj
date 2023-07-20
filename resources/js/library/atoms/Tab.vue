<template>
  <div
    class="content"
    :class="[{
      'active': active,
      'inactive': !active,
    }]"
  >
    <template v-if="active">
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    initial: {
      type: Boolean,
      default: false,
    },
    notifications: {
      type: [Boolean, String, Number],
      default: false
    },
  },
  data() {
    return {
      active: false,
      id: `_${Math.random().toString(36).substr(2, 9)}`
    };
  },
  created() {
    this.active = this.initial;
    this.$parent.tabs.push(this);
  },
};
</script>

<style lang="scss" scoped>
.content {
  gap: 14px;
  display: flex;
  flex-direction: column;
  .inactive {
    display: none;
  }
}
</style>

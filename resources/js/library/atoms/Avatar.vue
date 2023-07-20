<template>
  <div
    class="avatar-container"
    :style="{
      'cursor': (clickable ? 'pointer' : 'unset'),
      'height': `${size}px`,
      'width': `${size}px`,
    }"
    @click="$emit('click')"
  >
    <v-icon
      v-if="path === '' || path === null"
      :size="size"
      :icon="icon"
    />
    <div
      v-else
      class="avatar"
      :style="{
        'background': `url(/storage/${path})`
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    icon: {
      type: String,
      default: 'user-circle',
    },
    path: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '34',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.avatar-container {
  display: inline-flex;
  margin: 7px;
  i {
    opacity: .67;
  }
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background-size: contain !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
  }
}
</style>

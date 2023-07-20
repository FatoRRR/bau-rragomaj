<template>
  <div
    class="image-picker"
    :style="{
      width: `calc(2 * ${size}px)`,
      height: `calc(2 * ${size}px)`
    }"
  >
    <v-image
      :size="size"
      :icon="icon"
      :class="[
        'image',
        { 'inactive': hover }
      ]"
      :src="(modelValue.previewSrc ? modelValue.previewSrc : '')"
      @mouseover="(modelValue.previewSrc ? hover = true : null)"
    />
    <v-icon
      v-show="modelValue.previewSrc"
      icon="trash"
      :size="(size > 56 ? 24 : 16)"
      :class="[
        'delete-icon',
        { 'active': hover }
      ]"
      @click="removeImage"
      @mouseleave="hover = false"
    />
    <input
      :class="[
        'file',
        { 'file-selected': modelValue.previewSrc }
      ]"
      type="file"
      accept="image/*"
      :multiple="false"
      @change="updateImage"
    >
  </div>
</template>

<script>
import VImage from 'library/atoms/Image.vue';
import VIcon from 'library/atoms/Icon.vue';

export default {
  name: 'ImagePicker',
  components: {
    VImage,
    VIcon,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => { },
    },
    size: {
      type: Number,
      default: 56,
    },
    icon: {
      type: String,
      default: 'image',
    },
  },
  data() {
    return {
      hover: false,
    }
  },
  methods: {
    updateImage(e) {
      const image = e.target.files[0] || e.dataTransfer.files[0];
      if (image instanceof File) {
        this.createImage(image);
      }
    },
    getExtension(file) {
      return (file) ? file.name.split('.').pop() : '';
    },
    async createImage(image) {
      if (!image.fileName) {
        image.fileName = image.name;
      }

      image.extension = this.getExtension(image);

      const reader = new FileReader();
      reader.onload = (e) => {
        image.previewSrc = e.target.result;
        this.$emit('update:modelValue', image);
        this.$emit('change', image);
      };
      reader.readAsDataURL(image);

      await this.$nextTick();
    },
    removeImage() {
      this.$emit('update:modelValue', {});
      this.$emit('change', {});
    },
  },
};
</script>

<style lang="scss">
.image-picker {
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 50px;
  color: $secondaryColor;
  justify-content: center;

  .image {
    opacity: 1;
    z-index: 2;
    cursor: pointer;
    border-radius: 50px;
    background-size: cover;
    transition: all .45s ease;
    background-position: center;
    background-repeat: no-repeat;

    &.inactive {
      opacity: .67;
    }
  }

  .delete-icon {
    opacity: 0;
    z-index: -1;
    cursor: pointer;
    transition: all .25s ease;
    position: absolute !important;

    &.active {
      z-index: 3;
      opacity: 1;
    }
  }

  .file {
    top: 0px;
    left: 0px;
    z-index: 2;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    border-radius: 50px;

    &.file-selected {
      z-index: 1;
    }
  }
}
</style>

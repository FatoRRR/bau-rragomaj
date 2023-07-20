<template>
  <div
    :ref="'drop-zone'"
    :class="[
      size,
      'drop-zone',
      'file-picker',
      { 'dragging': dragging },
    ]"
    @drop.prevent="onChange"
    @mousedown.self="$refs.input.click()"
  >
    <div
      v-if="dragging"
      class="dragging-overlay"
    >Dateien hierhin verschieben</div>
    <v-icon
      icon="file-circle-plus"
      :clickable="true"
      :size="iconSize"
      @click="$refs.input.click()"
    />
    <div
      v-if="value.length"
      class="files"
    >
      <div
        v-for="(file, index) in value"
        :key="`${file.key}-${file.edit ? 1 : 0}-${reRenderCount}-${index}`"
        class="file-container"
        :style="`width: calc(1.6 * ${iconSize}px);min-width: calc(1.6 * ${iconSize}px);`"
      >
        <div class="file">
          <v-icon
            v-if="!disabled"
            icon="times"
            type="filled"
            :size="16"
            class="remove-file"
            @click="removeFile(index)"
          />
          <v-image
            :src="(file.previewSrc ? file.previewSrc : '')"
            :size="iconSize"
            :shadow="false"
            :icon="getIconName(file)"
            @click="$emit('file-clicked', file)"
          />
        </div>
        <div
          v-if="size !== 'small'"
          :class="[
            'file-title-container',
            { 'disabled': disabled }
          ]"
        >
          <div
            v-if="disabled"
            class="file-title"
          >
            {{ file.fileName }}
          </div>
          <template v-else>
            <input
              v-model="file.fileName"
              placeholder="File name"
              class="file-title-input"
              type="text"
              @blur="editFile(index, false)"
              @keyup.enter="editFile(index, false)"
            >
          </template>
        </div>
      </div>
    </div>
    <input
      ref="input"
      class="input-file"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onChange"
    >
  </div>
</template>

<script>
import VIcon from '../atoms/Icon';
import VImage from '../atoms/Image';

export default {
  name: 'FilePicker',
  components: {
    VIcon,
    VImage,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    removedFiles: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'default', // default, small
    },
    accept: {
      type: String,
      default: '*',
    },
  },
  data() {
    return {
      value: [],
      dragging: false,
      reRenderCount: 0,
      filesAlreadyCreated: false,
      hoveringOverDropzone: false,
      imageExtensions: ['img', 'jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'],
    };
  },
  computed: {
    iconSize() {
      switch (this.size) {
        case 'small':
          return 28;
        case 'default':
        default:
          return 46;
      }
    },
  },
  watch: {
    modelValue: {
      handler() {
        const filesNotCreated = this.modelValue.find(file => !('previewSrc' in file));
        if (filesNotCreated) {
          const temporaryFiles = [...this.modelValue];
          this.value = [];
          this.$emit('update:modelValue', []);
          this.$nextTick(() => {
            this.createFiles(temporaryFiles);
          });
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.modelValue.length > 0) {
      const temporaryFiles = [...this.modelValue];
      this.$emit('update:modelValue', []);
      this.$nextTick(() => {
        this.createFiles(temporaryFiles);
      });
    }
  },
  mounted() {
    const self = this;

    document.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
      self.dragging = true;
    });
    const interval = setInterval(() => {
      const dropZone = this.$refs['drop-zone'];
      if (dropZone) {
        document.addEventListener('dragend', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.dragging = false;
        });
        clearInterval(interval)
      }
    }, 50);
  },
  methods: {
    getIconName(file) {
      switch (file.extension) {
        case 'mp3':
        case 'wav':
        case 'audio':
          return 'file-audio';
        case 'csv':
          return 'file-csv';
        case 'pdf':
          return 'file-pdf';
        case 'xls':
        case 'xlsx':
          return 'file-excel';
        case 'doc':
        case 'docx':
          return 'file-word';
        case 'ppt':
        case 'pptx':
          return 'file-powerpoint';
        case 'mp4':
        case 'mov':
          return 'file-video';
        case 'zip':
        case 'rar':
          return 'file-zipper';
        case 'dump':
        case 'sql':
        case 'php':
        case 'vue':
        case 'css':
        case 'js':
          return 'file-code';

        default:
          return 'file';
      }
    },
    editFile(index, value) {
      if (!value) {
        this.$emit('name-changed', this.modelValue[index]);
      }
      this.modelValue[index].edit = value;
      this.reRenderCount += 1;
    },
    getExtension(file) {
      return (file) ? file.name.split('.').pop() : '';
    },
    onChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFiles(files);
    },
    async createFiles(files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        console.warn('File created', 'previewSrc' in file);
        if ('previewSrc' in file) {
          this.value.push(file);
          continue;
        }

        if (!file.fileName) {
          file.fileName = file.name;
        }

        file.edit = false;
        file.previewSrc = '';
        file.extension = this.getExtension(file);
        file.key = `_${Math.random().toString(36).substr(2, 9)}`;
        if (this.imageExtensions.includes(file.extension.toLowerCase())) {
          file.previewSrc = await this.readFile(file);
          this.value.push(file);
        } else {
          this.value.push(file);
        }
      }
      this.$emit('update:modelValue', this.value);
      this.dragging = false;
    },
    async readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
        reader.readAsDataURL(file);
      });
    },
    removeFile(index) {
      this.value.splice(index, 1);
      this.$emit('update:modelValue', this.value);
      this.$emit('remove', this.modelValue[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
.file-picker {
  gap: 14px;
  width: 100%;
  padding: 14px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  box-shadow: $shadow;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: $secondaryBackgroundColor;

  &.default {
    min-height: 160px;
  }

  &.small {
    min-height: 80px;
    max-height: 80px;
  }

  &.dragging {
    border: 3px solid $primaryActionColor;

    .dragging-overlay {
      background: rgba(255, 255, 255, 0.87);
      justify-content: center;
      align-items: center;
      position: absolute;
      color: black;
      display: flex;
      height: 100%;
      width: 100%;
      z-index: 2;
    }
  }

  .files {
    justify-content: flex-start;
    align-items: flex-end;
    overflow-x: scroll;
    cursor: default;
    display: flex;
    height: 100%;
    width: 100%;
    gap: 14px;

    .file-container {
      gap: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .file {
        display: flex;
        position: relative;

        .remove-file {
          position: absolute !important;
          cursor: pointer;
          right: -10px;
          top: -10px;
        }

        .image-preview {
          border-radius: 20px;
          box-shadow: $shadow;
          object-fit: cover;
        }
      }

      .file-title-container {
        height: 30px;

        .file-title {
          border: 1px solid #49454F;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-radius: 4px;
          padding: 4px 12px;
          max-width: 100px;
          overflow: hidden;
          color: #49454F;
          height: 100%;
        }

        .file-title-input {
          padding: 4px 12px;
          max-width: 100px;
        }

        &.disabled {
          cursor: not-allowed;
          opacity: .67;
        }
      }
    }
  }

  .input-file {
    opacity: 0;
    width: 0px;
    height: 0px;
  }

  .drop-zone {
    border-radius: 20px;
    position: relative;
    cursor: pointer;
    display: flex;
    padding: 14px;
    height: 100%;


  }
}
</style>

<template>
  <div
    v-click-away="() => { displaySelectOptions = false }"
    class="select-icon-container"
    :v-ripple="(displaySelectOptions === false)"
  >
    <v-icon
      :icon="modelValue"
      :clickable="true"
      type="filled"
      :size="32"
      @click="(!displaySelectOptions ? displaySelectOptions = true : null)"
    />

    <v-list
      v-if="displaySelectOptions"
      class="select-list"
    >
      <v-input v-model="search" />
      <template v-if="search === ''">
        <div
          v-for="(category, index) in icons"
          :key="index"
          class="category"
        >
          <p>{{ category.display_name }}</p>
          <div class="icons">
            <v-icon
              v-for="(icon, index) in category.icons"
              :key="index"
              :clickable="true"
              :icon="icon"
              @click="select(icon)"
            />
          </div>
        </div>
      </template>
      <div
        v-else-if="icons.length >= 1"
        class="icons"
      >
        <v-icon
          v-for="(icon, index) in icons"
          :key="index"
          :clickable="true"
          :icon="icon"
          @click="select(icon)"
        />
        <v-icon
          v-if="search !== ''"
          :clickable="true"
          :icon="search"
          @click="select(search)"
        />
      </div>
      <p v-else>Keine weiteren Icons gefunden</p>
    </v-list>
  </div>
</template>

<script>
import VInput from './Input';
import VIcon from './Icon';
import VList from '../molecules/List';

export default {
  name: 'SelectIcon',
  components: {
    VIcon,
    VList,
    VInput,
  },
  props: {
    placeholder: {
      required: true,
      type: String,
    },
    modelValue: {
      type: String,
      default: 'image',
    },
  },
  data() {
    return {
      search: '',
      displaySelectOptions: false,
    };
  },
  computed: {
    icons() {
      const icons = [
        {
          display_name: 'Allgemein',
          name: 'basics',
          icons: [
            'home',
            'map',
            'add',
            'key',
            'phone',
            'music',
            'star',
            'download',
            'envelope',
            'cloud',
            'comment',
            'trash',
            'gear',
            'video',
            'bookmark',
            'folder',
            'user',
            'heart',
            'image',
          ],
        },
        {
          display_name: 'Dokumente',
          name: 'files',
          icons: [
            'file',
            'file-pdf',
            'file-zipper',
            'file-code',
            'file-csv',
            'file-image',
            'file-video',
            'file-audio',
            'file-lines',
            'paperclip',
            'file-powerpoint',
            'file-word',
            'file-excel',
            'file-medical',
            'file-contract',
            'file-invoice',
            'file-invoice-dollar',
          ],
        },
        {
          display_name: 'Logos',
          name: 'brands',
          icons: [
            'fab-chrome',
            'fab-instagram',
            'fab-tiktok',
            'fab-github',
            'fab-discord',
            'fab-paypal',
            'fab-apple',
            'fab-linux',
            'fab-twitter',
            'fab-youtube',
            'fab-wordpress',
            'fab-windows',
          ],
        },
        {
          display_name: 'Sonstige',
          name: 'others',
          icons: [
            'plane',
            'bed',
            'car',
            'wifi',
            'utensils',
            'tv',
            'dice',
            'fire',
            'filter',
            'microphone',
            'headphones',
          ],
        },
      ];

      let filteredIcon = icons;
      if (this.search !== '') {
        filteredIcon = [];
        icons.forEach(group => {
          console.warn("group ", group);
          group.icons.forEach(icon => {
            console.warn("icon", icon);
            if (icon.includes(this.search.toLowerCase())) {
              filteredIcon.push(icon);
            }
          });
        })
      }

      return filteredIcon;
    },
  },
  methods: {
    select(icon) {
      this.$emit('update:modelValue', icon);
    },
  },
};
</script>

<style lang="scss">
$dimensions: 48px;

.select-icon-container {
  height: $dimensions;
  width: $dimensions;
  position: relative;
  cursor: pointer;

  .select-list {
    position: absolute;
    max-height: 200px;
    max-width: 200px;
    z-index: 2;
    left: calc(100% + 7px);
    top: -7px;

    .list {
      width: 189px;
      padding: 7px;
      height: 200px;

      .input-container {
        flex: 0;
      }

      p {
        text-align: center;
      }

      .icons {
        gap: 7px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
      }
    }
  }
}
</style>

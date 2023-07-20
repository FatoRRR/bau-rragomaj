<template>
  <div
    v-if="totalPages > 1"
    :class="[
      'pagination',
      position,
    ]"
  >
    <div class="pagination-count">
      Seite {{ activePage }} von {{ totalPages }}
    </div>
    <div
      class="pagination-icons"
    >
      <v-icon
        :size="18"
        icon="step-backward"
        :clickable="true"
        :color="(activePage !== 1 ? '' : 'rgba(0, 0, 0, 0.67)')"
        @click="activePage = 1"
      />
      <v-icon
        :size="18"
        icon="chevron-left"
        :clickable="true"
        :color="(activePage > 1 ? '' : 'rgba(0, 0, 0, 0.67)')"
        @click="activePage >= 2 ? activePage-- : null"
      />

      <v-icon
        :size="18"
        icon="chevron-right"
        :clickable="true"
        :color="(activePage !== totalPages ? '' : 'rgba(0, 0, 0, 0.67)')"
        @click="activePage < totalPages ? activePage++ : null"
      />

      <v-icon
        :size="18"
        icon="step-forward"
        :clickable="true"
        :color="(activePage !== totalPages ? '' : 'rgba(0, 0, 0, 0.67)')"
        @click="activePage = totalPages"
      />

      <!-- v-if="totalPages > 2" -->
    </div>
  </div>
</template>

<script>
import VButton from 'library/atoms/Button.vue';
import VIcon from 'library/atoms/Icon.vue';

export default {
  name: 'Pagination',
  components: {
    VButton,
    VIcon,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },

    position: {
      type: String,
      default: 'center', // left, center, right
    },
    initialPage: {
      type: Number,
      default: 1,
    },
    entriesPerPage: {
      type: Number,
      required: false,
      default: 25,
    },

    dataCount: {
      type: Number,
      required: true,
    },
    activeItems: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      activePage: this.initialPage,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.dataCount / this.entriesPerPage);
    },
  },
  watch: {
    activePage() {
      this.$emit('update:initialPage', this.activePage);
      this.$emit('pageChange', this.activePage);
      this.updateActiveItems();
    },
    entriesPerPage() {
      this.updateActiveItems();
    },
    totalPages() {
      if (this.activePage > this.totalPages) {
        this.activePage = this.totalPages;
      }
    },
  },
  created() {
    this.updateActiveItems();
  },
  methods: {
    updateActiveItems() {
      const newActiveItems = {
        from: (this.activePage - 1) * this.entriesPerPage,
        until: this.activePage * this.entriesPerPage,
      };
      this.$emit('update:activeItems', newActiveItems);
      this.$emit('change', newActiveItems);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  padding: 10px;
  font-size: 1rem;
  align-items: center;
  background-color: white;

  &.left {}
  &.center {
    justify-content: center;
  }
  &.right {
    justify-content: flex-end;
  }


  &-count {
    margin-left: 38px;
  }

  &-icons {
    align-items: center;
    margin-left: 38px;
    display: flex;

    > * {
      margin-left: 3px;
      margin-right: 3px;
    }

    :deep(.button-disabled) {
      color: grey;
    }
  }
}
</style>

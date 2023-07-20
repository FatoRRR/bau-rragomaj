<template>
  <div class="table-container">
    <table class="table">

      <slot
        v-if="$slots.header"
        name="header"
      />
      <thead v-else>
        <tr>
          <th v-if="selectable">
            <v-checkbox
              v-model="checkAll"
              checkbox
              small
              @click="selectAll"
            />
          </th>
          <th
            v-for="headerName in header"
            :key="headerName"
          >
            {{ headerName }}
          </th>
        </tr>
      </thead>
      <slot
        v-if="$slots.content"
        name="content"
      />
      <tbody v-else>
        <tr
          v-for="(element, index) in activeContent"
          :key="index"
        >
          <td v-if="selectable">
            <v-checkbox
              v-model="element.checked"
              checkbox
              small
              @click="selectElement(element)"
            />
          </td>
          <td
            v-for="(item, key) in header"
            :key="key"
            @click.stop="$emit('click', element)"
          >
            <div v-html="displayContent(element, key)" />
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="pagination"
      v-model:active-items="activeItems"
      :data-count="content.length"
    />
  </div>
</template>

<script>
import VCheckbox from '../atoms/Checkbox.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'Table',
  components: {
    VCheckbox,
    Pagination,
  },
  props: {
    header: {
      type: Object,
      default: () => {},
    },
    content: {
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkAll: false,
      activeItems: {
        from: 0,
        until: 100,
      },
    };
  },
  computed: {
    activeContent() {
      return this.content.slice(this.activeItems.from, this.activeItems.until);
    },
  },
  methods: {
    displayContent(object, headerElement) {
      let content = headerElement;

      if (!headerElement.includes('${')) {
        let element = object[headerElement];
        if (!element) {
          element = '';
        }
        content = content.replace(headerElement, element);
      } else if (/([\^$]\{[^}.]+[\$}])/g.test(headerElement)) {
        const found = headerElement.match(/([\^$]\{[^}.]+[\$}])/g);
        found.forEach((string) => {
          let element = object[string.substring(2, string.length - 1)];
          if (!element) {
            element = '';
          }
          content = content.replace(string, element);
        });
      }
      return content;
    },
    selectElement(element) {
      const selectedElements = this.content.filter((element) => element.checked);
      if (selectedElements.length === this.content.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      this.$emit('select', selectedElements);
    },
    selectAll(newStatus) {
      this.checkAll = newStatus;
      for (let index = 0; index < this.content.length; index++) {
        const element = this.content[index];
        element.checked = newStatus;
      }
      if (newStatus) {
        this.$emit('select', this.content);
      } else {
        this.$emit('select', []);
      }
    },
  },
};
</script>

<style lang="scss">

.table-container {
  margin: 14px 0px;
  overflow-x: auto;
  position: relative;
  border-radius: 24px;
  max-width: calc(100vw - 2px);
  border: 2px solid rgb(var(--primary-action-color));
  background: rgba(var(--primary-action-color), .11);
  table.table {
    white-space:nowrap;width:100%;
    table-layout: auto !important;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    thead {
      background-color: rgba(var(--primary-action-color), .11);
      tr {
        th {
          padding: 16px 24px;
          vertical-align: top;
          border-right: 1px solid $primaryActionColor;
          border-bottom: 1px solid $primaryActionColor;
          &:last-child {
            border-right: 0px;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 16px 24px;
          vertical-align: top;
          border-right: 1px solid rgb(var(--primary-action-color));
          border-bottom: 1px solid rgb(var(--primary-action-color));
          &:last-child {
            border-right: 0px;
          }
        }
        &:last-child {
          td {
            border-bottom: 0px;
          }
        }
      }
    }
    tr:nth-child(even) {
      background-color: var(--secondary-color);
    }
  }
}
</style>

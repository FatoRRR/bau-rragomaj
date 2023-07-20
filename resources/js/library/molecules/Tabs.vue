<template>
  <div class="tabs-container">
    <div
:class="[
      'tabs',
      type
    ]">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-ripple="'rgba(0, 0, 0, 0.11)'"
        :class="[
          'tab',
          {
            'active': tab.active,
            'unread-indicator': tab.unread
          }
        ]"
        @click="selectTab(tab)"
      >
        <v-icon
          v-if="tab.icon"
          :icon="tab.icon"
        ></v-icon>
        <div>{{ tab.title }}</div>
        <div class="border"></div>
        <div
          v-if="tab.counter && tab.counter != '' && tab.counter != 0"
          class="tab-counter"
        >
          {{ tab.counter }}
        </div>
      </div>
    </div>

    <div class="contents">
      <slot />
    </div>
  </div>
</template>

<script>
import VIcon from 'library/atoms/Icon';
import VBadge from 'library/atoms/Badge';

export default {
  components: {
    VIcon,
    VBadge,
  },
  props: {
    type: {
      type: String,
      default: '', // filled
    },
  },
  data() {
    return {
      tabs: [],
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab, index) => {
        tab.active = (tab.id === selectedTab.id);
      });
      this.$emit('select', selectedTab);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.87);
  &:deep(.icon-container) {
    // color: rgba(0, 0, 0, 0.87);
  }
  .tabs {
    display: flex;
    max-width: 100%;
    overflow-x: auto;
    border-bottom: 1px solid rgba(0, 0, 0, .11);
    .tab {
      gap: 14px;
      display: flex;
      cursor: pointer;
      min-height: 48px;
      max-height: 64px;
      padding: 0px 24px;
      user-select: none;
      position: relative;
      white-space: nowrap;
      align-items: center;
      justify-content: center;
      .border {
        left: 50%;
        opacity: 0;
        width: 38px;
        bottom: 0px;
        position: absolute;
        transition: all .25s ease;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        transform: translate(-50%, 0%);
        border-bottom: 3px solid rgba(var(--primary-action-color), 0.67);
      }
      &:hover {
        color: rgba(var(--primary-action-color), 1);
        &:deep(.icon-container) {
          color: rgba(var(--primary-action-color), 1);
        }
      }
      &.active {
        color: rgba(var(--primary-action-color), 1);
        &:deep(.icon-container) {
          color: rgba(var(--primary-action-color), 1);
        }
        .border {
          opacity: 1;
        }
      }
    }
    &.filled {
      box-shadow: $shadow;
      border-radius: 50px;
      background-color: rgba(var(--primary-action-color), .11);
      .tab {
        gap: 14px;
        display: flex;
        cursor: pointer;
        min-height: 56px;
        min-width: 180px;
        padding: 0px 24px;
        user-select: none;
        align-items: center;
        border-radius: 50px;
        justify-content: center;
        transition: all .25s ease;
        &:hover {
          color: rgba(0, 0, 0, 0.87);
          background-color: rgba(var(--primary-action-color), .05);
          &:deep(.icon-container) {
            color: rgba(0, 0, 0, 0.87);
          }
        }
        &.active {
          background-color: rgba(var(--primary-action-color), .09);
          color: rgb(var(--primary-action-color));
          &:deep(.icon-container) {
            color: rgba(var(--primary-action-color), 1);
          }
        }
        .border {
          display: none;
        }
      }
    }
  }
  .contents {
    margin-top: 14px;
  }
}
</style>


<template>
  <div class="section">
    <div
      v-if="type === 'primary'"
      :class="[
        'title-container',
        type,
      ]"
    >
      <v-button
        type="text"
        class="title"
        @click="displayContent = !displayContent"
      >
        {{ title }}
      </v-button>
      <v-button
        type="text"
        @click="displayContent = !displayContent"
      >
        <v-icon
          :size="12"
          :icon="(!displayContent ? 'caret-down' : 'caret-up')"
        />
      </v-button>
    </div>
    <div
      v-else
      class="title-container"
    >
      <hr>
      <v-button
        type="text"
        class="title"
        @click="displayContent = !displayContent"
      >
        <v-icon
          :size="12"
          :icon="(!displayContent ? 'caret-down' : 'caret-up')"
        />
        {{ title }}
      </v-button>
      <hr>
    </div>

    <Transition>
      <div
        v-if="displayContent"
        class="content"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script>
import VButton from 'library/atoms/Button'
import VIcon from 'library/atoms/Icon'
export default {
  name: 'VSection',
  components: {
    VButton,
    VIcon
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'default', // default, primary
    },
    displayContent: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.section {
  .title-container {
    display: flex;
    align-items: center;

    &.primary {
      margin-top: 14px;
      margin-bottom: 14px;
      justify-content: space-between;
    }

    .title {
      margin: 7px 14px;
    }

    hr {
      &:first-child {
        min-width: 24px;
      }

      &:last-child {
        width: 100%;
      }
    }
  }

  .content {
    gap: 14px;
    display: flex;
    padding-top: 14px;
    padding-left: 14px;
    padding-right: 14px;
    flex-direction: column;
  }
}
</style>

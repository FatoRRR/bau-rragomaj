<template>
  <div class="loading-indicator-container">
    <div
      :style="styles"
      :class="[
        'circle-loader',
        {'load-complete': status === 'successful'}
      ]"
    >
      <div
        :class="[
          'draw',
          'checkmark',
          {'show-checkmark': status === 'successful'}
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: false,
      default: '', // successful
    },
    size: {
      type: Number,
      required: false,
      default: 100,
    },
  },
  computed: {
    styles() {
      const borderWidth = Math.floor(this.size / 50);
      return `
      width: ${this.size}px;
      height: ${this.size}px;
      border-width: ${borderWidth === 0 ? 1 : borderWidth}px;`;
    },
  },
};
</script>

<style lang="scss" scoped>
$loader-size: 100%;
$loader-height: calc($loader-size/2);
$loader-width: calc($loader-height/2);
$loader-left: calc($loader-size/6 + $loader-size/12);
$loader-thickness: 3px;
$loader-color: $loaderColorPrimary;

.loading-indicator-container {
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  overflow: hidden;
  display: flex;
  height: 100%;
  width: 100%;
  .circle-loader {
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #dadada;
    border-left-color: $loader-color;
    box-sizing: border-box;
    animation: loader-spin 1.2s infinite linear;
    position: relative;
    display: inline-block;
    vertical-align: top;
    border-radius: 50%;
  }
}

.load-complete {
  -webkit-animation: none;
  animation: none;
  border-color: $loader-color;
  transition: border 500ms ease-out;
}

.checkmark {
  display: none;

  &.draw:after {
    animation-duration: 800ms;
    animation-timing-function: ease;
    animation-name: checkmark;
    transform: scaleX(-1) rotate(135deg);
  }

  &:after {
    opacity: 1;
    height: $loader-height;
    width: $loader-width;
    transform-origin: left top;
    border-right: $loader-thickness solid $loader-color;
    border-top: $loader-thickness solid $loader-color;
    content: '';
    left: $loader-left;
    top: $loader-height;
    position: absolute;
  }
}

.show-checkmark {
  display: block;
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: $loader-width;
    opacity: 1;
  }
  40% {
    height: $loader-height;
    width: $loader-width;
    opacity: 1;
  }
  100% {
    height: $loader-height;
    width: $loader-width;
    opacity: 1;
  }
}
</style>

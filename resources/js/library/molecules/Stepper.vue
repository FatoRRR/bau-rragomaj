<template>
  <div class="stepper-container">
    <div class="steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        v-ripple
        :class="[
          {
            'step': true,
            'step-active': step.active,
            'step-finished': step.finished,
          }
        ]"
        @click="selectStep(step)"
      >
        <div class="number">
          <font-awesome-icon
            v-if="step.finished"
            icon="check"
          />
          <div v-else>
            {{ step.number }}
          </div>
        </div>
        <div class="title-container">
          <div class="title">
            {{ step.title }}
          </div>
          <div
            v-if="step.subtitle !== ''"
            class="subtitle"
          >
            {{ step.subtitle }}
          </div>
        </div>
        <div class="background" />
      </div>
      <div class="progress" />
    </div>
    <div class="step-container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stepper',
  data() {
    return {
      steps: [],
    };
  },
  computed: {
    activeStep() {
      let activeStep = this.steps.findIndex((step) => step.initial);
      // if initial is not set
      if (activeStep === -1) {
        activeStep = 0;
      }
      return activeStep;
    },
  },
  mounted() {
    this.selectStep(this.steps[this.activeStep]);
  },
  methods: {
    selectStep(selectedStep) {
      let activeStepFound = false;
      this.steps.forEach((step) => {
        step.active = false;
        step.finished = false;
        if (step.title === selectedStep.title) {
          step.active = true;
          activeStepFound = true;
        }
        if (!activeStepFound) {
          step.finished = true;
        }
      });
      selectedStep.emitSelect();
    },
  },
};
</script>

<style lang="scss" scoped>
$background-color: #F9FAFB;
$finished-color: #13B8A6;
$active-color: #5046E5;
$border-radius: 4px;

.stepper-container {
  .steps {
    background-color: $background-color;
    justify-content: space-between;
    border-radius: $border-radius;
    align-items: center;
    position: relative;
    display: flex;
    padding: 7px;
    width: 100%;
    .step {
      gap: 14px;
      z-index: 1;
      padding: 14px;
      display: flex;
      cursor: pointer;
      user-select: none;
      position: relative;
      align-items: center;
      color: rgba(0, 0, 0, .67);
      border-radius: $border-radius;
      background-color: $background-color;
      .number {
        z-index: 1;
        width: 36px;
        height: 36px;
        display: flex;
        font-size: 1em;
        align-items: center;
        border-radius: 50px;
        justify-content: center;
        background-color: white;
      }
      .title-container {
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        .title {
          font-size: 1.1em;
        }
        .subtitle {
          opacity: .87;
          font-size: .9em;
        }
      }
      .background {
        top: 0px;
        left: 0px;
        z-index: 1;
        width: 100%;
        height: 100%;
        position: absolute;
        transition: all .25s ease;
        border-radius: $border-radius;
        background-color: transparent;
        &:hover {
          background-color: rgba(0, 0, 0, .06);
        }
      }
      &.step-active {
        color: $active-color;
        .number {
          color: white;
          background-color: $active-color;
        }
      }
      &.step-finished {
        color: $finished-color;
        .number {
          color: white;
          background-color: $finished-color;
        }
      }
    }
    .progress {
      z-index: 0;
      position: absolute;
      width: calc(100% - 14px);
      border-bottom: 2px solid rgba(0, 0, 0, .67);
    }
  }
  .step-container {
    padding: 24px;
  }
}
</style>

<template>
  <transition name="slide-down">
    <div
      class="fixed rounded-md bottom-0 left-0 right-0 mx-4 bg-footer text-on-primary z-50"
      v-if="isSnackbarVisible"
    >
      <div class="max-w-6xl mx-auto">
        <div
          :class="[
            `flex items-center justify-between text-on-primary w-full h-12 leading-4 p-4`,
            snackbarColor
          ]"
        >
          <div class="tg-caption-mobile">
            {{ snackbar.message }}
          </div>
          <div class="tg-body-mobile" @click="toggleSnackbar(false)">
            Hide
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'BaseSnackbar',
  computed: {
    ...mapGetters('snackbar', ['isSnackbarVisible', 'snackbar', 'getTimeout']),
    snackbarColor() {
      return this.snackbar.type === 'error' ? 'bg-error' : 'bg-accent';
    }
  },
  updated() {
    if (this.isSnackbarVisible) {
      setTimeout(() => {
        this.toggleSnackbar(false);
      }, this.getTimeout);
    }
  },
  methods: {
    ...mapActions('snackbar', ['toggleSnackbar'])
  }
};
</script>

<style scoped>
.slide-down-leave-active {
  animation: slide-out-bottom 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

.slide-down-leave /* .fade-leave-active below version 2.1.8 */ {
  animation: slide-out-bottom 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes slide-out-bottom {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(1000px);
    opacity: 0;
  }
}
</style>

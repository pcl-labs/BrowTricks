<template>
  <div class="w-full">
    <label
      class="block text-left tg-caption-mobile text-on-background text-opacity-50"
    >
      {{ label }}
    </label>
    <div>
      <input
        type="text"
        :class="[
          'w-full placeholder-on-background placeholder-opacity-50 outline-none focus:outline-none',
          border
        ]"
        :placeholder="placeholder"
        :value="value"
        v-on="inputListeners"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    border: {
      type: String,
      default: 'border-b border-opacity-50'
    }
  },
  computed: {
    inputListeners: function() {
      return Object.assign({}, this.$listeners, {
        blur: this.onBlur,
        input: this.onInput
      });
    }
  },
  methods: {
    onBlur($event) {
      if (!this.value && !$event.target.value) {
        return;
      }
      this.$emit('input', $event.target.value);
    },
    onInput($event) {
      if (this.immediateInput) {
        this.$emit('input', $event.target.value);
      }
    }
  }
};
</script>

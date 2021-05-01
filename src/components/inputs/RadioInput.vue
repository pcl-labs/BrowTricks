<template>
  <div
    class="w-full cursor-pointer tg-body-mobile flex items-center focus:shadow-none outline-none"
    tabindex="0"
    :class="[className, { 'opacity-50 cursor-not-allowed': disabled }]"
    @click="selectOption"
    @keyup.enter="selectOption"
    @keyup.space="selectOption"
  >
    <div
      class="rounded-full h-5 w-5 p-1 border-2 border-accent mr-4"
      :class="{ 'border-accent': selectedOption === value }"
    >
      <div
        class="h-full w-full rounded-full"
        :class="{ 'bg-accent': selectedOption === value }"
      ></div>
    </div>
    <div>
      <slot name="title">
        {{ label || value }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioInput',
  model: {
    prop: 'selectedOption',
    event: 'updateSelectedOption'
  },
  props: {
    selectedOption: {
      type: [String, Number, Boolean]
    },
    label: {
      type: [String, Number],
      default: 'Option'
    },
    value: {
      type: [String, Number, Boolean],
      default: 'Option'
    },
    disabled: {
      type: Boolean
    },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectOption() {
      if (this.disabled) return;
      else this.$emit('updateSelectedOption', this.value);
    }
  }
};
</script>

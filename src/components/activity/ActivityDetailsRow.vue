<template functional>
  <div class="w-full flex justify-around py-2 gap-2 text" v-on="listeners">
    <div>
      <slot />
    </div>
    <div class="flex-1 flex flex-col items-start">
      <div class="flex w-full justify-between">
        <p :class="[props.nameStyles]">
          {{ props.details.name }}
        </p>
        <div :class="[props.totalFontStyles, 'self-end']">
          $ {{ props.details.total }}
        </div>
      </div>
      <div
        class="w-full flex gap-1 items-center flex-no-wrap tg-caption-mobile text-brand3"
      >
        <div>{{ props.details.date }}</div>
        <div :class="[props.dotBg, 'rounded-full w-2 h-2']"></div>
        <div>{{ props.details.subType }}: Subscription</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityDetailsRow',
  props: {
    details: {
      type: Object,
      required: true
    },
    nameStyles: {
      type: String,
      default: ''
    },
    totalFontStyles: {
      type: String,
      default: 'tg-mobile-body'
    },
    dotBg: {
      type: String,
      default: 'bg-accent'
    }
  }
};
</script>

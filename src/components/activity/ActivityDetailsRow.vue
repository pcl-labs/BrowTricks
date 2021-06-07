<template>
  <a
    :href="details.statementLink"
    target="_blank"
    title="View transaction invoice"
    class="w-full flex justify-around py-2 gap-2 text cursor-pointer"
  >
    <IconRectangle />
    <div class="flex-1 flex flex-col items-start">
      <div class="flex w-full justify-between">
        <p :class="[nameStyles]">
          {{ formatDate(details.paymentDate) }}
        </p>
        <div :class="[totalFontStyles, 'self-end']">$ {{ details.total }}</div>
      </div>
      <div
        class="w-full flex gap-1 items-center flex-no-wrap tg-caption-mobile text-brand3 truncate"
      >
        <div>Subscription</div>
        <div :class="[dotBg, 'rounded-full w-2 h-2 mx-1']" />
        <div>{{ details.transactionId }}</div>
      </div>
    </div>
  </a>
</template>

<script>
import IconRectangle from '@/assets/icons/Rectangle.svg';
import { format } from 'date-fns';

export default {
  name: 'ActivityDetailsRow',
  components: {
    IconRectangle
  },
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
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'dd MMM, yyyy');
    }
  }
};
</script>

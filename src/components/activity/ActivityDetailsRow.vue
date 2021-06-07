<template>
  <a
    :href="details.statementLink"
    target="_blank"
    title="View transaction invoice"
    class="w-full flex justify-around py-2 gap-2 hover:bg-brand8 hover:bg-opacity-50 cursor-pointer"
  >
    <AttachMoney class="fill-current flex-shrink-0 text-brand3" />
    <div class="flex-1 flex flex-col items-start">
      <div class="flex w-full justify-between">
        <span :class="[nameStyles]">
          {{ formatDate(details.paymentDate) }}
        </span>
        <span :class="[totalFontStyles, 'mx-2 self-end']">
          ${{ details.total }}
        </span>
      </div>
      <p
        class="w-full flex gap-1 items-center flex-no-wrap tg-caption-mobile text-brand3 truncate"
      >
        <span :class="[dotBg, 'rounded-full w-2 h-2 mx-0.5']" />
        Subscription
      </p>
    </div>
  </a>
</template>

<script>
import AttachMoney from '@/assets/icons/attach_money.svg';
import { format } from 'date-fns';

export default {
  name: 'ActivityDetailsRow',
  components: {
    AttachMoney
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

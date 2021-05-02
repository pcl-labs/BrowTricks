<template>
  <div class="px-4 flex flex-col pt-10 gap-4">
    <div class="flex flex-col items-center gap-4">
      <IconAvatarRound />
      <h2 class="tg-mobile-h2">$ {{ transactionDetails.total }}</h2>
      <p class="text-on-background">
        {{ transactionDetails.subType }}: Subscription
      </p>
    </div>
    <div>
      <BaseCard className="flex-col gap-4" padding="px-0 py-6">
        <div class="px-4">
          <ActivityDetailsRow
            :details="transactionDetails"
            totalFontStyles="tg-mobile-caption text-brand3 text-xs"
            nameStyles="text-base"
            dotBg="bg-brand3"
          >
            <IconRectangle class="w-8 h-8" />
          </ActivityDetailsRow>
        </div>
        <hr class="divide-on-background-image p-0 px-4" />
        <div class="tg-caption-mobile text-brand3">
          <div class="flex justify-between px-4">
            <span>SubTotal</span>
            <span>$12</span>
          </div>
          <div class="flex justify-between px-4">
            <span>Coupon Code: Queen</span>
            <span>$1.20</span>
          </div>
        </div>
        <div class="bg-brand3 b-0 bottom-hr w-full" />
        <div class="flex justify-between tg-h2-mobile px-4">
          <span>Total</span>
          <span>$ 10.80</span>
        </div>
      </BaseCard>
    </div>
    <div class="flex-grow">
      <h3 class="tg-h3-mobile text-left">
        Details
      </h3>
      <!-- this div can be repeated using a loop -->
      <div class="flex justify-between">
        <span> Status</span>
        <span class="tg-caption-mobile"> $100</span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import ActivityDetailsRow from '@/components/activity/ActivityDetailsRow.vue';
import IconRectangle from '@/assets/icons/Rectangle.svg';
import IconAvatarRound from '@/assets/icons/avatar_round.svg';

export default {
  name: 'TransactionsDetails',
  components: {
    BaseCard,
    ActivityDetailsRow,
    IconAvatarRound,
    IconRectangle
  },
  props: {
    transactionDetails: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.bottom-hr {
  height: 1px;
}
</style>

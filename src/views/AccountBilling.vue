<template>
  <div class="max-w-md w-full mx-auto pt-6 px-4">
    <div class="pb-4">
      <ExpansionPanel
        title="Activity"
        @click="
          $router.push({
            name: 'AccountActivity'
          })
        "
      />
      <ExpansionPanel
        title="Payment Methods"
        @click="
          $router.push({
            name: 'PaymentMethods'
          })
        "
      />
      <ExpansionPanel
        title="Subscription"
        :middleText="planName"
        middleTextAlignment="text-right"
        @click="
          $router.push({
            name: 'Subscriptions'
          })
        "
      />
    </div>
  </div>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountBilling',
  components: {
    ExpansionPanel
  },
  computed: {
    ...mapGetters('subscription', ['getActiveSubscription']),
    planName() {
      return this.getActiveSubscription?.plan?.name || 'Standard';
    }
  }
};
</script>

<template>
  <div class="p-4">
    <div v-if="transactions.length">
      <ActivityDetailsRow
        v-for="(transaction, index) in transactions"
        :key="index"
        :details="transaction"
      />
    </div>
    <div v-else class="tg-body-mobile">
      <p>No Activity Details found!</p>
    </div>
  </div>
</template>

<script>
import ActivityDetailsRow from '@/components/activity/ActivityDetailsRow.vue';
import { mapActions } from 'vuex';
import { SubscriptionService } from '@whynotearth/meredith-axios';

export default {
  name: 'AccountActivity',
  components: {
    ActivityDetailsRow
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      transactions: []
    };
  },
  async created() {
    try {
      this.loadingUpdate(true);
      await this.loadSubscriptionPayments();
    } catch (error) {
      this.show({
        text: 'Error fetching details. Please try again later',
        button: {
          title: 'Okay',
          action: () => this.updateVisibility(false)
        }
      });
    } finally {
      this.loadingUpdate(false);
    }
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('alerter', ['show', 'updateVisibility']),

    async loadSubscriptionPayments() {
      const payments = await SubscriptionService.payments({
        tenantSlug: this.tenantSlug
      });
      this.transactions = [...payments];
      return payments;
    }
  }
};
</script>

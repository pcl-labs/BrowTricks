<template>
  <div class="p-4">
    <div v-show="accountActivityDetails.length">
      <template v-for="(data, index) in accountActivityDetails">
        <ActivityDetailsRow
          :details="data"
          :key="index"
          @click="
            $router.push({
              name: 'TransactionDetails',
              params: { transactionDetails: data }
            })
          "
        >
          <!-- replace this with actaul image coming from api -->
          <IconRectangle />
        </ActivityDetailsRow>
      </template>
    </div>
    <div v-show="!accountActivityDetails.length" class="tg-body-mobile">
      <p>No Activity Details found!</p>
    </div>
  </div>
</template>

<script>
import ActivityDetailsRow from '@/components/activity/ActivityDetailsRow.vue';
import IconRectangle from '@/assets/icons/Rectangle.svg';
import { mapActions } from 'vuex';

export default {
  name: 'AccountActivity',
  components: {
    ActivityDetailsRow,
    IconRectangle
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // replace mockData with data coming from api
      accountActivityDetails: []
    };
  },
  async created() {
    try {
      this.loadingUpdate(true);
      this.accountActivityDetails = await this.getPaymentDetails({
        tenantSlug: this.tenantSlug
      });
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
    ...mapActions('accountActivity', ['getPaymentDetails']),
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('alerter', ['show', 'updateVisibility'])
  }
};
</script>

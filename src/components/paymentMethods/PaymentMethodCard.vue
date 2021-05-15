<template>
  <BaseCard className="flex-col gap-2" padding="px-4 py-4">
    <div class="flex gap-2 p-4">
      <div class="self-center">
        <!-- <img :src="require('@/assets/icons/amex.png')" /> -->
      </div>
      <div class="flex flex-col items-start">
        <span>{{ paymentMethod.brand }} ****{{ paymentMethod.last4 }}</span>
        <span class="tg-caption-mobile text-on-background text-opacity-50">
          Expires {{ paymentMethod.expirationMonth }}/{{
            paymentMethod.expirationYear
          }}
        </span>
      </div>
    </div>
    <hr class="divide-on-background-image p-0 px-4" />
    <div class="flex flex-row-reverse justify-start mt-2">
      <Button
        title="Edit"
        textColor="text-accent"
        background="bg-none"
        width="w-xs"
        padding="px-0"
        margin="mx-6"
      >
      </Button>
      <Button
        title="Remove"
        textColor="text-error"
        background="bg-none"
        width="w-xs"
        padding="px-0"
        margin="mx-6"
        @clicked="deletePaymentMethod"
      >
      </Button>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import { mapActions } from 'vuex';

export default {
  name: 'PaymentMethodCard',
  components: {
    BaseCard
  },
  props: {
    paymentMethod: {
      type: Object,
      default: () => ({})
    },
    tenantSlug: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('paymentMethod', ['removePaymentMethod']),
    ...mapActions('loading', ['loadingUpdate']),
    async deletePaymentMethod() {
      this.loadingUpdate(true);
      let data = {
        params: { tenantSlug: this.tenantSlug, id: this.paymentMethod.id }
      };
      await this.removePaymentMethod(data);
      this.loadingUpdate(false);
    }
  }
};
</script>

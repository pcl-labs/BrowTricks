<template>
  <BaseCard className="flex-col gap-2" padding="px-4 py-4">
    <div class="flex gap-2 p-4">
      <div class="self-center">
        <img :src="getCardBrandIcon" />
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
      />
      <Button
        title="Remove"
        textColor="text-error"
        background="bg-none"
        width="w-xs"
        padding="px-0"
        margin="mx-6"
        @clicked="deletePaymentMethod"
      />
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
  computed: {
    getCardBrandIcon() {
      let brand = this.paymentMethod.brand;
      return require(`@/assets/pm-icons/${brand.toLowerCase()}.png`);
    }
  },
  methods: {
    ...mapActions('paymentMethod', ['removePaymentMethod']),
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('alerter', ['show', 'updateVisibility']),

    async deletePaymentMethod() {
      try {
        this.loadingUpdate(true);
        let data = {
          params: { tenantSlug: this.tenantSlug, id: this.paymentMethod.id }
        };
        await this.removePaymentMethod(data);
        this.show({
          text: 'Payment Method Deleted Successfully',
          button: {
            title: 'Okay',
            action: () => this.updateVisibility(false)
          }
        });
      } catch (err) {
        this.show({
          text: 'Error Deleting Payment Method',
          button: {
            title: 'Okay',
            action: () => this.updateVisibility(false)
          }
        });
      } finally {
        this.loadingUpdate(false);
        this.$emit('refetch-cards');
      }
    }
  }
};
</script>

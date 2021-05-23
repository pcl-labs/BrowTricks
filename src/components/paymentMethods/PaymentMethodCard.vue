<template>
  <div class="w-full">
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
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PaymentMethodCard',
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
  }
};
</script>

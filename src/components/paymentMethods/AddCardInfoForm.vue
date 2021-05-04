<template>
  <BaseCard className="flex-col gap-2">
    <div>
      <BaseTextInput label="First Name" placeholder="First Name">
      </BaseTextInput>
    </div>
    <div>
      <BaseTextInput label="Last Name" placeholder="Last Name"> </BaseTextInput>
    </div>
    <div class="text-left">
      <label class="tg-caption-mobile text-on-background text-opacity-50">
        Card Number
      </label>
      <div ref="cardNumber" class="card-info-elements"></div>
    </div>
    <div class="text-left">
      <label class="tg-caption-mobile text-on-background text-opacity-50">
        Expiration Date (MM/YY)
      </label>
      <div ref="cardExpiry" class="card-info-elements"></div>
    </div>
    <div class="text-left">
      <label class="tg-caption-mobile text-on-background text-opacity-50">
        Security Code (CVC)
      </label>
      <div ref="cardCvc" class="card-info-elements"></div>
    </div>
    <div>
      <BaseTextInput label="Zip Code" placeholder="Zip Code"> </BaseTextInput>
    </div>
  </BaseCard>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

import BaseCard from '@/components/BaseCard.vue';
import BaseTextInput from '@/components/inputs/BaseTextInput.vue';

export default {
  name: 'AddCardInfoForm',
  components: {
    BaseCard,
    BaseTextInput
  },
  data() {
    return {
      elements: {}
    };
  },
  async mounted() {
    const stripe = await loadStripe(this.getStripeKey);
    this.elements = stripe.elements();
    this.createCardInfoElements();
  },
  computed: {
    getStripeKey() {
      return process.env.VUE_APP_STRIPE_PUBLIC_KEY;
    }
  },
  methods: {
    createCardInfoElements() {
      let baseStyle = {
        style: {
          base: {
            '::placeholder': {
              color: 'rgba(0, 0, 0, 0.5)'
            }
          },
          invalid: {
            color: '#E74323'
          }
        }
      };
      let card = this.elements.create('cardNumber', baseStyle);
      let cardExpiry = this.elements.create('cardExpiry', baseStyle);
      let cardCvc = this.elements.create('cardCvc', baseStyle);
      card.mount(this.$refs.cardNumber);
      cardExpiry.mount(this.$refs.cardExpiry);
      cardCvc.mount(this.$refs.cardCvc);
    }
  }
};
</script>

<style scoped>
.card-info-elements {
  padding-bottom: 3.5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

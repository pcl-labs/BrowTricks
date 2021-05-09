<template>
  <div class="space-y-4">
    <BaseCard className="flex-col gap-2">
      <BaseTextInput
        label="First Name"
        placeholder="First Name"
        v-model="$v.userInfo.firstName.$model"
        :validatorModel="$v.userInfo.firstName"
      >
        <p v-if="!$v.userInfo.firstName.required">
          First Name is required
        </p>
        <p v-if="!$v.userInfo.firstName.alpha">
          First Name should contain only Alphabets
        </p>
      </BaseTextInput>
      <BaseTextInput
        label="Last Name"
        placeholder="Last Name"
        v-model="$v.userInfo.lastName.$model"
      >
        <p v-if="!$v.userInfo.lastName.required">
          Last Name is required
        </p>
        <p v-if="!$v.userInfo.lastName.alpha">
          Last Name should contain only Alphabets
        </p>
      </BaseTextInput>
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
    </BaseCard>
    <BaseCard className="flex-col gap-2">
      <BaseTextInput
        placeholder="Street Address 1"
        label="Street Address 1"
        v-model="$v.billingInfo.address1.$model"
      >
        <p v-if="!$v.billingInfo.address1.required">
          Street Address 1 is required
        </p>
        <p v-if="!$v.billingInfo.address1.alpha">
          Street Address 1 should contain only AlphaNumeric
        </p>
      </BaseTextInput>
      <BaseTextInput
        placeholder="Street Address 2"
        label="Street Address 2"
        v-model="$v.billingInfo.address2.$model"
      >
        <p v-if="!$v.billingInfo.address2.required">
          Street Address 2 is required
        </p>
        <p v-if="!$v.billingInfo.address2.alpha">
          Street Address 2 should contain only AlphaNumeric
        </p>
      </BaseTextInput>
      <BaseTextInput
        placeholder="City"
        label="City"
        v-model="$v.billingInfo.city.$model"
      >
        <p v-if="!$v.billingInfo.state.required">
          City is required
        </p>
        <p v-if="!$v.billingInfo.state.alpha">
          City should contain only Alphabets
        </p>
      </BaseTextInput>
      <BaseTextInput
        placeholder="State"
        label="State"
        v-model="$v.billingInfo.state.$model"
      >
        <p v-if="!$v.billingInfo.state.required">
          State is required
        </p>
        <p v-if="!$v.billingInfo.state.alpha">
          State should contain only Alphabets
        </p>
      </BaseTextInput>
      <BaseTextInput
        placeholder="Zip Code"
        label="Zip Code"
        v-model="$v.billingInfo.zipcode.$model"
      >
        <p v-if="!$v.billingInfo.zipcode.required">
          Zipcode is required
        </p>
        <p v-if="!$v.billingInfo.zipcode.numeric">
          Zipcode should contain only Numeric
        </p>
      </BaseTextInput>
    </BaseCard>
    <Button title="Save" background="bg-white" @clicked="submit"> </Button>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

import BaseCard from '@/components/BaseCard.vue';
import BaseTextInput from '@/components/inputs/BaseTextInput.vue';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';

import {
  required,
  alpha,
  alphaNum,
  numeric,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'AddCardInfoForm',
  mixins: [formGeneralUtils],
  components: {
    BaseCard,
    BaseTextInput
  },
  data() {
    return {
      elements: {},
      stripe: {},
      userInfo: {
        firstName: '',
        lastName: ''
      },
      billingInfo: {
        country: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      validCardDetails: false
    };
  },
  validations: {
    userInfo: {
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      }
    },
    billingInfo: {
      address1: {
        required,
        alphaNum
      },
      address2: {
        required,
        alphaNum
      },
      city: {
        required,
        alpha
      },
      state: {
        required,
        alpha
      },
      zipcode: {
        required,
        numeric,
        minLength: minLength(5),
        maxLength: maxLength(5)
      }
    }
  },
  async mounted() {
    this.stripe = await loadStripe(this.getStripeKey);
    this.elements = this.stripe.elements();
    this.createCardInfoElements();
  },
  computed: {
    getStripeKey() {
      return process.env.VUE_APP_STRIPE_PUBLIC_KEY;
    }
  },
  methods: {
    ...mapActions('paymentMethod', ['generateToken', 'updateCardElements']),
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
      let cardNumber = this.elements.create('cardNumber', baseStyle);
      let cardExpiry = this.elements.create('cardExpiry', baseStyle);
      let cardCvc = this.elements.create('cardCvc', baseStyle);

      cardNumber.mount(this.$refs.cardNumber);
      cardExpiry.mount(this.$refs.cardExpiry);
      cardCvc.mount(this.$refs.cardCvc);
      this.validateCardElement(cardNumber);
      this.validateCardElement(cardExpiry);
      this.validateCardElement(cardCvc);
    },
    validateCardElement(cardElement) {
      cardElement.on('change', e => {
        if (e.complete) {
          this.validCardDetails = true;
          return;
        }
        this.validCardDetails = false;
      });
    },
    submit() {
      if (!this.beforeSubmit() || !this.validCardDetails) {
        return;
      }

      let cardData = {
        cardNumber: this.stripe.getElement('cardNumber'),
        cardExpiry: this.stripe.getElement('cardExpiry'),
        cardCvc: this.stripe.getElement('cardCvc')
      };
      let additionalData = {
        name: this.userInfo.firstName + this.userInfo.lastName,
        address_line1: this.billingInfo.address1,
        address_line2: this.billingInfo.address2,
        address_city: this.billingInfo.city,
        address_state: this.billingInfo.state,
        address_zip: this.billingInfo.zipcode
      };
      this.generateToken({ cardData, additionalData });
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

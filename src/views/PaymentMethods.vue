<template>
  <div class="p-4 space-y-4">
    <PaymentMethodCard> </PaymentMethodCard>
    <Button
      title="+ Add Payment Methods"
      border="border-dashed border-2 border-brand6 border-opacity-50"
      width="w-full"
      textColor="text-brand6 text-opacity-50"
      @clicked="showAddPaymentMethodForms"
      v-show="!isFormVisible"
    >
    </Button>
    <div class="pb-16 space-y-4" v-show="isFormVisible">
      <AddCardInfoForm> </AddCardInfoForm>
    </div>
  </div>
</template>

<script>
import PaymentMethodCard from '@/components/paymentMethods/PaymentMethodCard.vue';
import AddCardInfoForm from '@/components/paymentMethods/AddCardInfoForm.vue';
// import AddBillingInfoForm from '@/components/paymentMethods/AddBillingInfoForm.vue';

export default {
  name: 'PaymentMethods',
  components: {
    PaymentMethodCard,
    AddCardInfoForm
    // AddBillingInfoForm
  },
  data() {
    return {
      isFormVisible: false
    };
  },
  methods: {
    showAddPaymentMethodForms() {
      this.isFormVisible = true;
    }
  }
};
</script>

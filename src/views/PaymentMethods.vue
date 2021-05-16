<template>
  <div class="p-4 space-y-4">
    <template v-for="details in getPaymentMethods">
      <PaymentMethodCard
        :tenantSlug="tenantSlug"
        v-if="details"
        :key="details.id"
        :paymentMethod="details"
      ></PaymentMethodCard>
    </template>
    <Button
      title="+ Add Payment Methods"
      border="border-dashed border-2 border-brand6 border-opacity-50"
      width="w-full"
      textColor="text-brand6 text-opacity-50"
      @clicked="showAddPaymentMethodForms(true)"
      v-show="!isFormVisible"
    >
    </Button>
    <div class="pb-16 space-y-4" v-show="isFormVisible">
      <AddCardInfoForm
        :tenantSlug="tenantSlug"
        @show-form="showAddPaymentMethodForms"
        @show-snackbar="showSnackBar"
      >
      </AddCardInfoForm>
    </div>
  </div>
</template>

<script>
import PaymentMethodCard from '@/components/paymentMethods/PaymentMethodCard.vue';
import AddCardInfoForm from '@/components/paymentMethods/AddCardInfoForm.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PaymentMethods',
  components: {
    PaymentMethodCard,
    AddCardInfoForm
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isFormVisible: false,
      paymentMethods: [],
      infiniteId: +new Date(),
      isSnackBarVisible: false,
      snackbarMessage: {
        type: '',
        message: ''
      }
    };
  },
  created() {
    this.loadingUpdate(true);
    this.fetchPaymentMethods({
      params: { tenantSlug: this.tenantSlug }
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        this.loadingUpdate(false);
      });
  },
  computed: {
    ...mapGetters('paymentMethod', ['getPaymentMethods'])
  },
  methods: {
    ...mapActions('paymentMethod', ['fetchPaymentMethods']),
    ...mapActions('loading', ['loadingUpdate']),
    showAddPaymentMethodForms(value) {
      this.isFormVisible = value;
    },
    showSnackBar(value) {
      this.isSnackBarVisible = true;
      this.snackbarMessage = value;
    },
    hideSnackbar() {
      this.isSnackBarVisible = false;
    }
  }
};
</script>

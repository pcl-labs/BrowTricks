<template>
  <div class="p-4 space-y-4">
    <BaseCard
      v-for="details in getPaymentMethods"
      className="flex-col gap-2"
      padding="px-4 py-4"
      :key="details.id"
    >
      <PaymentMethodCard
        :tenantSlug="tenantSlug"
        v-if="details"
        :paymentMethod="details"
        @refetch-cards="fetchAllPaymentMethods"
      >
        <hr class="divide-on-background-image p-0 px-4" />
        <div class="flex flex-row-reverse justify-start mt-2">
          <Button
            title="Remove"
            textColor="text-error"
            background="bg-none"
            width="w-xs"
            padding="px-0"
            margin="mx-6"
            @clicked="deletePaymentMethod(details.id)"
          />
        </div>
      </PaymentMethodCard>
    </BaseCard>
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
        @refetch-cards="fetchAllPaymentMethods"
      >
      </AddCardInfoForm>
    </div>
  </div>
</template>

<script>
import PaymentMethodCard from '@/components/paymentMethods/PaymentMethodCard.vue';
import AddCardInfoForm from '@/components/paymentMethods/AddCardInfoForm.vue';
import BaseCard from '@/components/BaseCard.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PaymentMethods',
  components: {
    PaymentMethodCard,
    AddCardInfoForm,
    BaseCard
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
    this.fetchAllPaymentMethods();
  },
  computed: {
    ...mapGetters('paymentMethod', ['getPaymentMethods'])
  },
  methods: {
    ...mapActions('paymentMethod', [
      'fetchPaymentMethods',
      'removePaymentMethod'
    ]),
    ...mapActions('alerter', ['show', 'updateVisibility']),
    ...mapActions('loading', ['loadingUpdate']),
    showAddPaymentMethodForms(value) {
      this.isFormVisible = value;
    },
    fetchAllPaymentMethods() {
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
    async deletePaymentMethod(id) {
      try {
        this.loadingUpdate(true);
        let data = {
          params: { tenantSlug: this.tenantSlug, id: id }
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
        this.fetchAllPaymentMethods();
      }
    }
  }
};
</script>

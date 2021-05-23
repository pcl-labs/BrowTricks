<template>
  <div class="px-4 py-6 space-y-6 w-full mb-16">
    <BaseCard className="flex-col gap-2">
      <div class="flex w-full">
        <div class="flex-grow text-left">
          <p class="tg-body-mobile">
            $20/YEAR
          </p>
          <p class="tg-caption-mobile text-on-background text-opacity-50">
            Standard Subscription
          </p>
        </div>
        <div>
          <Button
            title="Manage"
            textColor="text-accent"
            background="bg-none"
            width="w-xs"
            padding="px-0"
            @clicked="isOpen = true"
          />
        </div>
      </div>
      <hr class="divide-on-background-image p-0 px-4" />
      <div class="space-y-4 mt-4">
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Subscription Status
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            Active
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Payments
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            Automatic
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Last Payment Date
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            28 May, 2020
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Last Repayment Amount
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            $10.00
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Renews On
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            28 June, 2020
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Coupon Code
          </span>
          <Button
            title="Add Coupon"
            textColor="text-accent"
            background="bg-none"
            padding="px-0"
            width="w-xs"
            margin="mx-0"
            textJustify="text-right"
            @clicked="isCouponModalOpen = true"
          />
        </div>
      </div>
    </BaseCard>
    <BaseCard
      className="flex-col gap-2"
      v-for="methods in getPaymentMethods"
      :key="methods.id"
    >
      <div class="flex">
        <div class="self-center mb-8">
          <RadioInput marginRight="mr-0" :value="methods.id">
            <template #title>
              <span> </span>
            </template>
          </RadioInput>
        </div>
        <PaymentMethodCard :paymentMethod="methods" :tenantSlug="tenantSlug">
          <hr class="divide-on-background-image -mx-2 w-full" />
          <div class="flex justify-center mt-2">
            <Button
              title="Change Payment Method"
              textColor="text-accent"
              background="bg-none"
              width="w-xs"
              padding="px-0"
              margin="mx-6"
            />
          </div>
        </PaymentMethodCard>
      </div>
    </BaseCard>
    <BaseCard className="flex-col gap-2">
      <p class="tg-h2-mobile text-left">
        Transaction
      </p>
      <div class="space-y-4 mt-4">
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            28 May, 2020
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            $20.20
          </span>
        </div>
      </div>
      <hr class="divide-on-background-image p-0 px-4 mt-2" />
      <div class="text-center mt-2">
        <Button
          title=" View Transaction"
          textColor="text-accent"
          background="bg-none"
          width="w-xs"
          padding="px-0"
          margin="mx-6"
          :to="{ name: 'AccountActivity' }"
        />
      </div>
    </BaseCard>
    <div class="w-full">
      <BaseDrawerActions
        :isOpen="isOpen"
        @close="isOpen = false"
        drawerClasses="flex-col overflow-y-auto"
      >
        <div class="p-4 space-y-2">
          <h4 class="title text-opacity-high text-left tg-h2-mobile">
            Upgrade Your Plan now!
          </h4>
          <div class="flex justify-center tg-body-mobile">
            <p>Paying with Visa 1234</p>
            <span class="text-error ml-1">Edit</span>
          </div>
        </div>
        <div class="space-y-4 p-4 pb-16">
          <PlanPriceCards @selected="selectPlan" :selectedPlan="selectedPlan" />
        </div>
        <div class="w-full fixed bottom-0">
          <Button
            :title="getTitle"
            width="w-full"
            radius="rounded-none"
            background="bg-accent"
          >
          </Button>
        </div>
      </BaseDrawerActions>
    </div>

    <BaseDialog
      v-if="isCouponModalOpen"
      @close="isCouponModalOpen = false"
      title="Add Coupon Code"
    >
      <template #content>
        <MaterialInput label="Coupon Code" placeholder="Coupon Code" />
        <hr class="divide-on-background-image p-0 px-4 mt-6" />
        <div class="text-center mt-6">
          <a href="#" class="text-accent tg-color-label-mobile">
            Apply Code
          </a>
        </div>
      </template>
    </BaseDialog>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import PlanPriceCards from '@/components/plans/PlanPriceCards.vue';
import BaseDrawerActions from '@/components/BaseDrawerActions.vue';
import BaseDialog from '@/components/BaseDialog.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import PaymentMethodCard from '@/components/paymentMethods/PaymentMethodCard.vue';
import RadioInput from '@/components/inputs/RadioInput.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Subscriptions',
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  components: {
    BaseCard,
    PlanPriceCards,
    BaseDrawerActions,
    BaseDialog,
    MaterialInput,
    PaymentMethodCard,
    RadioInput
  },
  data() {
    return {
      isOpen: false,
      selectedPlan: 'free',
      isCouponModalOpen: false
    };
  },
  created() {
    this.fetchAllPaymentMethods();
  },
  computed: {
    ...mapGetters('paymentMethod', ['getPaymentMethods']),
    getTitle() {
      return `Upgrade to ${this.selectedPlan} Now`;
    }
  },
  methods: {
    ...mapActions('paymentMethod', ['fetchPaymentMethods']),
    ...mapActions('loading', ['loadingUpdate']),
    selectPlan(value) {
      this.selectedPlan = value;
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
    }
  }
};
</script>

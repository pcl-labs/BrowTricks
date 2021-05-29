<template>
  <div class="px-4 py-6 space-y-6 w-full mb-16">
    <BaseCard className="flex-col gap-2">
      <div class="flex w-full">
        <div class="flex-grow text-left">
          <p class="tg-body-mobile">
            $0/YEAR
          </p>
          <p class="tg-caption-mobile text-on-background text-opacity-50">
            Standard Subscription
          </p>
        </div>
        <div>
          <Button
            title="Manage"
            textColor="text-success underline"
            background="bg-none"
            width="w-xs"
            padding="px-0"
            @clicked="isOpen = true"
          />
        </div>
      </div>
      <div class="flex justify-between" v-show="couponcode">
        <div
          class="text-left tg-caption-mobile text-on-background text-opacity-50"
        >
          <p>First Year (Ends 4 August, 2020)</p>
          <p class="tg-body-mobile">
            <strike>20.00</strike>
            <span class="text-on-background"> $15.00</span>
          </p>
          <p>Code {{ couponcode }}: Ends 28 June, 2020</p>
        </div>
        <div class="self-center">
          <IconClear @click="isRemoveCouponModalOpen = true" />
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
            textColor="text-success underline"
            background="bg-none"
            padding="px-0"
            width="w-xs"
            margin="mx-0"
            textJustify="text-right"
            @clicked="isAddCouponModalOpen = true"
          />
        </div>
      </div>
    </BaseCard>
    <BaseCard>
      <div class="flex flex-col w-full">
        <RadioInput
          v-for="method in paymentMethods"
          :key="method.id"
          v-model="selectedPaymentMethod"
          :value="method"
          marginRight="mr-0"
        >
          <template #title>
            <PaymentMethodCard
              :paymentMethod="method"
              :tenantSlug="tenantSlug"
            />
          </template>
        </RadioInput>
        <hr class="divide-on-background-image p-0 px-4 mt-2" />
        <Button
          :to="{ name: 'PaymentMethods' }"
          title="Add another card"
          textColor="text-success underline"
          background="bg-none"
          textJustify="justify-left"
        />
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
          textColor="text-success underline"
          background="bg-none"
          width="w-xs"
          padding="px-0"
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
            <p>
              Paying with {{ selectedPaymentMethod.brand }}
              {{ selectedPaymentMethod.last4 }}
            </p>
            <span class="text-error ml-1">Edit</span>
          </div>
        </div>
        <div class="space-y-4 p-4 pb-16">
          <PlanPriceCards @selected="selectPlan" :selectedPlan="selectedPlan" />
        </div>
        <div class="w-full fixed bottom-0">
          <Button
            :title="`Upgrade to ${selectedPlan} Now`"
            width="w-full"
            radius="rounded-none"
            background="bg-accent"
          />
        </div>
      </BaseDrawerActions>
    </div>

    <BaseDialog
      v-if="isAddCouponModalOpen"
      @close="isAddCouponModalOpen = false"
      title="Add Coupon Code"
    >
      <template #content>
        <div>
          <MaterialInput
            label="Coupon Code"
            placeholder="Coupon Code"
            v-model="couponcode"
          />
          <hr class="divide-on-background-image p-0 px-4 mt-6" />
          <div class="text-center mt-6">
            <Button
              title="Apply Coupon"
              textColor="text-success underline"
              background="bg-none"
              padding="px-0"
              @clicked="applyCouponCode"
            />
          </div>
        </div>
        <div v-show="couponcode"></div>
      </template>
    </BaseDialog>
    <BaseDialog
      v-if="isRemoveCouponModalOpen"
      @close="isRemoveCouponModalOpen = false"
      title="Remove Coupon Code"
    >
      <template #content>
        <p>This will revert your subscription to its original price.</p>
        <div class="flex flex-row-reverse gap-8">
          <Button
            title="Agree"
            textColor="text-success underline"
            background="bg-none"
            padding="px-0"
            margin="mx-0"
            width="w-xs"
            @clicked="removeCouponCode"
          />
          <Button
            title="Cancel"
            textColor="text-error"
            background="bg-none"
            padding="px-0"
            margin="mx-0"
            width="w-xs"
            @clicked="isCouponModalOpen = false"
          />
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
import IconClear from '@/assets/icons/clear.svg';

import { mapActions } from 'vuex';
import {
  PaymentMethodService,
  SubscriptionService
} from '@whynotearth/meredith-axios';

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
    RadioInput,
    IconClear
  },
  data() {
    return {
      isOpen: false,
      selectedPlan: 'free',
      isAddCouponModalOpen: false,
      isRemoveCouponModalOpen: false,
      paymentMethods: [],
      selectedPaymentMethod: {},
      couponcode: ''
    };
  },
  created() {
    this.init();
  },
  computed: {
    getTitle() {
      return `Upgrade to ${this.selectedPlan} Now`;
    },
    getCouponDialogTitle() {
      return this.couponcode ? 'Remove ' : 'Add ' + 'Coupon Code';
    }
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),

    async init() {
      try {
        this.loadingUpdate(true);
        const paymentMethods = await PaymentMethodService.paymentmethods1({
          tenantSlug: this.tenantSlug
        });
        this.paymentMethods = [...paymentMethods];
        this.selectedPaymentMethod = paymentMethods[0];
      } catch {
        this.show({
          text: 'Error fetching details, refreshing may help',
          button: {
            title: 'Okay',
            action: () => this.updateVisibility(false)
          }
        });
      } finally {
        this.loadingUpdate(false);
      }
    },
    selectPlan(value) {
      this.selectedPlan = value;
    }
  }
};
</script>

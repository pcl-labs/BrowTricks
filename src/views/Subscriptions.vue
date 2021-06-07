<template>
  <div class="px-4 py-6 space-y-6 w-full mb-16">
    <BaseCard className="flex-col gap-2">
      <div class="flex w-full">
        <div class="flex-grow text-left">
          <p class="tg-body-mobile">
            <span v-if="activeSubscription.status === 'Cancelled'">
              Free
            </span>
            <span v-else-if="transactions.length">
              ${{ transactions[0].total }}/Year
            </span>
          </p>
          <span class="tg-caption-mobile text-on-background text-opacity-50">
            Standard Subscription
          </span>
        </div>
        <div>
          <Button
            title="Manage"
            textColor="text-success underline"
            :background="null"
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
        <button class="self-center" @click="isRemoveCouponModalOpen = true">
          <IconClear />
        </button>
      </div>
      <hr class="divide-on-background-image p-0 px-4" />
      <div class="space-y-4 mt-4">
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Subscription Status
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            {{ activeSubscription.status }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Last Payment Date
          </span>
          <span
            v-if="transactions.length"
            class="text-on-background tg-body-bold-mobile"
          >
            {{ formatDate(transactions[0].paymentDate) }}
          </span>
          <span v-else>-</span>
        </div>
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Last Payment Amount
          </span>
          <span
            v-if="transactions.length"
            class="text-on-background tg-body-bold-mobile"
          >
            ${{ transactions[0].total }}
          </span>
        </div>
        <!-- <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Renews On
          </span>
          <span class="text-on-background tg-body-bold-mobile">
            28 June, 2020
          </span>
        </div> -->
        <!-- <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Coupon Code
          </span>
          <Button
            title="Add Coupon"
            textColor="text-success underline"
            :background="null"
            padding="px-0"
            width="w-xs"
            margin="mx-0"
            textJustify="text-right"
            @clicked="isAddCouponModalOpen = true"
          />
        </div> -->
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
          :background="null"
          textJustify="justify-left"
        />
      </div>
    </BaseCard>
    <BaseCard className="flex-col gap-2">
      <p class="tg-h2-mobile text-left">
        Transactions
      </p>
      <template v-if="transactions.length">
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="space-y-4 mt-4"
        >
          <div class="flex justify-between">
            <span class="text-on-background text-opacity-50 tg-body-mobile">
              {{ formatDate(transaction.paymentDate) }}
            </span>
            <span class="text-on-background tg-body-bold-mobile">
              ${{ transaction.total }}
            </span>
          </div>
        </div>
        <hr class="divide-on-background-image p-0 px-4 mt-2" />
        <div class="text-center mt-2">
          <Button
            title="View Transaction"
            textColor="text-success underline"
            :background="null"
            width="w-xs"
            padding="px-0"
            :to="{ name: 'AccountActivity' }"
          />
        </div>
      </template>
      <template v-else>
        No transactions found.
      </template>
    </BaseCard>
    <div class="w-full">
      <BaseDrawerActions
        :isOpen="isOpen"
        @close="isOpen = false"
        drawerClasses="flex-col overflow-y-auto"
      >
        <div class="p-4 space-y-2">
          <h2 class="title mb-4 text-opacity-high tg-h2-mobile">
            Upgrade Your Plan now!
          </h2>
          <div class="flex justify-center tg-body-mobile">
            <p>
              Paying with
              <b>
                {{ selectedPaymentMethod.brand }}
                {{ selectedPaymentMethod.last4 }}
              </b>
            </p>
            <!-- <span class="text-error ml-1">Edit</span> -->
          </div>
        </div>
        <div class="space-y-4 p-4 pb-16">
          <PlanPriceCards v-model="selectedPlan" />
        </div>
        <div class="w-full fixed bottom-0">
          <Button
            :title="`Upgrade to ${selectedPlan.name} Now`"
            width="w-full"
            radius="rounded-none"
            background="bg-accent"
            @clicked="subscribe"
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
        <MaterialInput
          label="Coupon Code"
          placeholder="Coupon Code"
          v-model="couponcode"
        />
      </template>
      <Button
        title="Apply Coupon"
        textColor="text-success"
        :background="null"
        padding="px-0"
        width="w-xs"
        margin="mx-0"
        @clicked="applyCouponCode"
      />
    </BaseDialog>
    <BaseDialog
      v-if="isRemoveCouponModalOpen"
      @close="isRemoveCouponModalOpen = false"
      title="Remove Coupon Code"
    >
      <template #content>
        <p>This will revert your subscription to its original price.</p>
      </template>
      <div class="flex gap-8">
        <Button
          title="Cancel"
          textColor="text-error"
          :background="null"
          padding="px-0"
          margin="mx-0"
          width="w-xs"
          @clicked="isRemoveCouponModalOpen = false"
        />
        <Button
          title="Agree"
          textColor="text-success"
          :background="null"
          padding="px-0"
          margin="mx-0"
          width="w-xs"
          @clicked="removeCouponCode"
        />
      </div>
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
import { format } from 'date-fns';
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
      selectedPlan: {},
      isAddCouponModalOpen: false,
      isRemoveCouponModalOpen: false,
      paymentMethods: [],
      selectedPaymentMethod: {},
      couponcode: null,
      transactions: [],
      activeSubscription: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('alerter', ['show', 'updateVisibility']),

    async init() {
      try {
        this.loadingUpdate(true);
        await Promise.all([
          this.loadPaymentMethods(),
          this.loadSubscriptionPayments(),
          this.fetchActiveSubscription()
        ]);
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
    formatDate(date) {
      return format(new Date(date), 'dd MMM, yyyy');
    },
    async loadPaymentMethods() {
      const paymentMethods = await PaymentMethodService.paymentmethods1({
        tenantSlug: this.tenantSlug
      });
      this.paymentMethods = [...paymentMethods];
      this.selectedPaymentMethod = paymentMethods[0];
      return paymentMethods;
    },
    async loadSubscriptionPayments() {
      const payments = await SubscriptionService.payments({
        tenantSlug: this.tenantSlug
      });
      this.transactions = [...payments];
      return payments;
    },
    applyCouponCode() {
      if (this.couponcode) {
        this.isAddCouponModalOpen = false;
      }
    },
    removeCouponCode() {
      this.couponcode = '';
      this.isRemoveCouponModalOpen = false;
    },
    async fetchActiveSubscription() {
      const subscription = await SubscriptionService.subscriptions1({
        tenantSlug: this.tenantSlug
      });
      this.activeSubscription = { ...subscription };
    },
    async subscribe() {
      try {
        this.loadingUpdate(true);
        const payload = {
          tenantSlug: this.tenantSlug,
          body: {
            planId: this.selectedPlan.id,
            cardId: this.selectedPaymentMethod.id,
            couponCode: this.couponcode
          }
        };
        const response = await SubscriptionService.subscriptions(payload);
        console.log(response);
      } catch (error) {
        this.show({
          text: 'Error subscribing, try again or contact us.',
          button: {
            title: 'Contact Us',
            action: () => {
              window.open('https://browtricksproductsorg.zendesk.com/');
              this.updateVisibility(false);
            }
          }
        });
      } finally {
        this.isOpen = false;
        this.loadingUpdate(false);
      }
    }
  }
};
</script>

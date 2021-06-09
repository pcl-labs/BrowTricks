<template>
  <div class="px-4 py-6 space-y-6 w-full mb-16">
    <BaseCard className="flex-col gap-2" padding="p-6">
      <div class="flex w-full">
        <div class="flex-grow text-left">
          <p class="tg-body-mobile">
            <template v-if="activeSubscriptions.length && transactions.length">
              ${{ transactions[0].total }}/Year
              <br />
              <span
                class="tg-caption-mobile text-on-background text-opacity-50"
              >
                Pro Subscription
              </span>
            </template>
            <template v-else-if="transactions.length">
              Free
              <br />
              <span
                class="tg-caption-mobile text-on-background text-opacity-50"
              >
                Standard Subscription
              </span>
            </template>
          </p>
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
            <template v-if="activeSubscriptions.length">
              {{ activeSubscriptions[0].status }}
            </template>
            <template v-else>
              No active subscription
            </template>
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
        <div class="flex justify-between">
          <span class="text-on-background text-opacity-50 tg-body-mobile">
            Renews On
          </span>
          <span
            v-if="activeSubscriptions.length && activeSubscriptions[0].card"
            class="text-on-background tg-body-bold-mobile"
          >
            {{ renewalDate(transactions[0].paymentDate) }}
          </span>
          <span v-else>Set a payment method for automatic renewal</span>
        </div>
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
    <BaseCard className="flex-col gap-2" padding="p-6">
      <h2 class="tg-h2-mobile text-left">
        Payment Method
      </h2>
      <template v-if="!showChangePaymentMethod && selectedPaymentMethod">
        <PaymentMethodCard
          :paymentMethod="selectedPaymentMethod"
          :tenantSlug="tenantSlug"
          class="-ml-4"
        />
        <hr class="divide-on-background-image p-0 px-4 my-2" />
        <Button
          title="Change payment Method"
          textColor="text-success underline"
          :background="null"
          padding="px-0"
          width="w-xs"
          margin="mx-0"
          @clicked="showChangePaymentMethod = true"
        />
      </template>
      <template v-else>
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
        <router-link
          :to="{ name: 'PaymentMethods' }"
          class="my-1 w-auto text-left underline"
        >
          <IconAdd class="h-4 my-auto mr-2 inline-block" />
          Add Credit Card
        </router-link>
        <template v-if="showChangePaymentMethod">
          <!-- When there is no card available, there would be no subscription, allow the user to select a card -->
          <hr class="divide-on-background-image p-0 px-4 my-2" />
          <Button
            title="Save payment Method"
            textColor="text-success underline"
            :background="null"
            padding="px-0"
            width="w-xs"
            margin="mx-0"
            @clicked="changePaymentMethod"
          />
        </template>
      </template>
    </BaseCard>
    <BaseCard className="flex-col gap-2" padding="p-6">
      <h2 class="tg-h2-mobile text-left">
        Transactions
      </h2>
      <template v-if="transactions.length">
        <ActivityDetailsRow
          v-for="(transaction, index) in transactions"
          :key="index"
          :details="transaction"
        />
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
          <div
            v-if="selectedPaymentMethod"
            class="flex justify-center tg-body-mobile"
          >
            Paying with
            <b>
              {{ selectedPaymentMethod.brand }}
              {{ selectedPaymentMethod.last4 }}
            </b>
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
import IconAdd from '@/assets/icons/add.svg';
import BaseCard from '@/components/BaseCard.vue';
import PlanPriceCards from '@/components/plans/PlanPriceCards.vue';
import BaseDrawerActions from '@/components/BaseDrawerActions.vue';
import BaseDialog from '@/components/BaseDialog.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import PaymentMethodCard from '@/components/paymentMethods/PaymentMethodCard.vue';
import RadioInput from '@/components/inputs/RadioInput.vue';
import IconClear from '@/assets/icons/clear.svg';
import ActivityDetailsRow from '@/components/activity/ActivityDetailsRow.vue';
import { mapActions } from 'vuex';
import { format, add } from 'date-fns';
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
    IconAdd,
    BaseCard,
    PlanPriceCards,
    BaseDrawerActions,
    BaseDialog,
    MaterialInput,
    PaymentMethodCard,
    RadioInput,
    IconClear,
    ActivityDetailsRow
  },
  data() {
    return {
      isOpen: false,
      selectedPlan: {},
      isAddCouponModalOpen: false,
      isRemoveCouponModalOpen: false,
      paymentMethods: [],
      selectedPaymentMethod: null,
      couponcode: null,
      transactions: [],
      activeSubscriptions: [],
      showChangePaymentMethod: false
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
        await this.fetchActiveSubscription();
        await Promise.all([
          this.loadPaymentMethods(),
          this.loadSubscriptionPayments()
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
    renewalDate(date) {
      const renewalDate = add(new Date(date), { years: 1 });
      return format(renewalDate, 'dd MMM, yyyy');
    },
    async loadPaymentMethods() {
      const paymentMethods = await PaymentMethodService.paymentmethods1({
        tenantSlug: this.tenantSlug
      });
      this.paymentMethods = [...paymentMethods];
      this.selectedPaymentMethod = this.activeSubscriptions[0]?.card;
      if (!this.selectedPaymentMethod) {
        this.showChangePaymentMethod = true;
        this.selectedPaymentMethod = paymentMethods[0];
      }
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
      const subscriptions = await SubscriptionService.subscriptions1({
        tenantSlug: this.tenantSlug
      });
      this.activeSubscriptions = [...subscriptions];
    },
    async subscribe() {
      try {
        this.loadingUpdate(true);
        const payload = {
          tenantSlug: this.tenantSlug,
          body: {
            planId: this.selectedPlan.id,
            cardId: this.selectedPaymentMethod?.id,
            couponCode: this.couponcode
          }
        };
        await SubscriptionService.subscriptions(payload);
        await this.init();
        this.show({
          text: 'Subscription successful!',
          button: {
            title: 'Okay',
            action: () => this.updateVisibility(false)
          }
        });
      } catch (error) {
        this.show({
          text:
            error.response?.data?.message ||
            'Error subscribing, try again or contact us.',
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
    },
    async changePaymentMethod() {
      try {
        this.loadingUpdate(true);
        const payload = {
          tenantSlug: this.tenantSlug,
          body: {
            cardId: this.selectedPaymentMethod?.id
          }
        };
        await SubscriptionService.changepaymentmethod(payload);
        await this.init();
        this.showChangePaymentMethod = false;
        this.show({
          text: 'Successfully updated payment method!',
          button: {
            title: 'Okay',
            action: () => this.updateVisibility(false)
          }
        });
      } catch (error) {
        this.show({
          text:
            error.response?.data ||
            'Error changing payment method, try again or contact us.',
          button: {
            title: 'Contact Us',
            action: () => {
              window.open('https://browtricksproductsorg.zendesk.com/');
              this.updateVisibility(false);
            }
          }
        });
      } finally {
        this.loadingUpdate(false);
      }
    }
  }
};
</script>

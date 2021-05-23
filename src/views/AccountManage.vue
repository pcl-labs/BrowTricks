<template>
  <PageContentBoard>
    <div class="max-w-md w-full mx-auto pt-6 px-4">
      <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">Account</h3>
        <ExpansionPanel title="Verify Phone Number"> </ExpansionPanel>

        <ExpansionPanel title="Verify Email"> </ExpansionPanel>
      </div>
      <!-- your business section -->
      <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">Your Business</h3>
        <ExpansionPanel title="Business Hours"> </ExpansionPanel>

        <ExpansionPanel title="Booking Options"> </ExpansionPanel>
        <ExpansionPanel title="Services"> </ExpansionPanel>

        <ExpansionPanel title="Promotions"> </ExpansionPanel>
        <ExpansionPanel
          title="Switch to User Account"
          headingColor="text-error"
        >
        </ExpansionPanel>
        <Button
          title="Upgrade to Pro"
          background="bg-black"
          textColor="text-white"
          @clicked="isOpen = true"
        >
        </Button>
        <Button
          title="DELETE ACCOUNT"
          background="bg-on-accent"
          textColor="text-error"
          to="#"
        >
        </Button>
      </div>
    </div>
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
  </PageContentBoard>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import BaseDrawerActions from '@/components/BaseDrawerActions.vue';
import PlanPriceCards from '@/components/plans/PlanPriceCards.vue';

export default {
  name: 'AccountSettings',
  components: {
    ExpansionPanel,
    BaseDrawerActions,
    PlanPriceCards
  },
  data() {
    return {
      isOpen: false,
      selectedPlan: 'free'
    };
  },
  computed: {
    currentPath() {
      return this.$route.fullPath;
    },
    getTitle() {
      return `Upgrade to ${this.selectedPlan} Now`;
    }
  },
  methods: {
    selectPlan(value) {
      this.selectedPlan = value;
    }
  }
};
</script>

<style scoped></style>

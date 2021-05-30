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
          title="Manage subscription"
          background="bg-black"
          textColor="text-white"
          :to="{ name: 'Subscriptions' }"
        />
        <Button
          title="DELETE ACCOUNT"
          :background="null"
          textColor="text-error"
          to="#"
        />
      </div>
    </div>
  </PageContentBoard>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';

export default {
  name: 'AccountSettings',
  components: {
    ExpansionPanel
  },
  data() {
    return {
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

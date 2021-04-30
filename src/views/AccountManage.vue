<template>
  <PageContentBoard>
    <div class="max-w-md w-full mx-auto pt-6 px-4">
      <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">Account</h3>
        <ExpansionPanel
          title="Verify Phone Number"
          @click="
            $router.push({
              name: ''
            })
          "
        >
        </ExpansionPanel>

        <ExpansionPanel
          title="Verify Email"
          @click="
            $router.push({
              name: ''
            })
          "
        >
        </ExpansionPanel>
      </div>
      <!-- your business section -->
      <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">Your Business</h3>
        <ExpansionPanel
          title="Business Hours"
          @click="
            $router.push({
              name: ''
            })
          "
        >
        </ExpansionPanel>

        <ExpansionPanel
          title="Booking Options"
          @click="
            $router.push({
              name: ''
            })
          "
        >
        </ExpansionPanel>
        <ExpansionPanel
          title="Services"
          @click="
            $router.push({
              name: ''
            })
          "
        >
        </ExpansionPanel>

        <ExpansionPanel
          title="Promotions"
          @click="
            $router.push({
              name: ''
            })
          "
        >
        </ExpansionPanel>
        <ExpansionPanel
          title="Switch to User Account"
          headingColor="text-error"
          @click="
            $router.push({
              name: ''
            })
          "
        >
        </ExpansionPanel>
        <Button
          title="Upgrade to Pro"
          background="bg-black"
          textColor="text-white"
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
  </PageContentBoard>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
export default {
  name: 'AccountSettings',
  components: {
    ExpansionPanel
  },
  computed: {
    currentPath() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped></style>

<template>
  <div class="max-w-md w-full mx-auto pt-6 px-4">
    <div class="pb-4">
      <ExpansionPanel
        title="Activity"
        @click="
          $router.push({
            name: 'AccountActivity'
          })
        "
      >
      </ExpansionPanel>
      <ExpansionPanel title="Payment Methods"> </ExpansionPanel>
      <ExpansionPanel
        title="Subscription"
        middleText="Standard"
        middleTextAlignment="text-right"
      >
      </ExpansionPanel>
    </div>
  </div>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';

export default {
  components: {
    ExpansionPanel
  }
};
</script>

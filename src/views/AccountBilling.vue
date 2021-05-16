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
      />
      <ExpansionPanel
        title="Payment Methods"
        @click="
          $router.push({
            name: 'PaymentMethods'
          })
        "
      />
      <ExpansionPanel
        title="Subscription"
        middleText="Standard"
        middleTextAlignment="text-right"
      />
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

<template>
  <BaseCard className="flex-col gap-2">
    <BaseTextInput placeholder="Building Name" label="Building Name">
    </BaseTextInput>
    <BaseTextInput placeholder="Street Address 1" label="Street Address 1">
    </BaseTextInput>
    <BaseTextInput placeholder="Street Address 2" label="Street Address 2">
    </BaseTextInput>
    <BaseTextInput placeholder="City" label="City"> </BaseTextInput>
    <BaseTextInput placeholder="State" label="State"> </BaseTextInput>
    <BaseTextInput placeholder="Zip Code" label="Zip Code"> </BaseTextInput>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import BaseTextInput from '@/components/inputs/BaseTextInput.vue';

export default {
  name: 'AddBillingInfoForm',
  components: {
    BaseCard,
    BaseTextInput
  }
};
</script>

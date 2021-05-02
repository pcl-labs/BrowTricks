<template>
  <BaseCard className="flex-col gap-2">
    <MaterialInput
      placeholder="First Name"
      label="First Name"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Building Name"
      label="Building Name"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Street Address 1"
      label="Street Address 1"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Street Address 2"
      label="Street Address 2"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="City"
      label="City"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="State"
      label="State"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Zip Code"
      label="Zip Code"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';

export default {
  name: 'AddBillingInfoForm',
  components: {
    BaseCard,
    MaterialInput
  }
};
</script>

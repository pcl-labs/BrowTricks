<template>
  <BaseCard className="flex-col gap-2">
    <MaterialInput
      placeholder="First Name"
      label="First Name"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Last Name"
      label="last Name"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Card Number"
      label="Card Number"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Expiration Date (MM/YY)"
      label="Expiration Date (MM/YY)"
      labelColor="text-on-background text-opacity-50"
    >
    </MaterialInput>
    <MaterialInput
      placeholder="Security Code (CCV)"
      label="Security Code (CCV)"
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
  name: 'AddCardInfoForm',
  components: {
    BaseCard,
    MaterialInput
  }
};
</script>

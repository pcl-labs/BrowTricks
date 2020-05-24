<template>
  <div class="text-black">
    <div class="tg-h2-mobile mb-4">Manage Your Clients</div>
    <div class="tg-body-mobile mb-4">
      Access your client’s information, photos, and agreements here.
    </div>
    <div>
      <BaseButton class="bg-secondary text-on-primary">
        <IconAdd slot="icon" class="fill-current" />
        <span slot="cta-text">Add New Client</span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import IconAdd from '@/assets/icons/add.svg';

export default {
  name: 'TenantClientListEmpty',
  components: {
    BaseButton,
    IconAdd
  }
};
</script>

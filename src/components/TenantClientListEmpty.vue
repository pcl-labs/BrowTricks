<template>
  <div
    class="tenant-client-list-empty bg-cover bg-no-repeat h-full flex flex-col mt-auto pb-20 px-8 text-on-background-image"
  >
    <img :src="iconClients" class="h-40 w-40 m-auto mb-4" />
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
  data() {
    return {
      iconClients:
        'https://res.cloudinary.com/whynotearth/image/upload/v1585738963/BrowTricks/_0003_MANAGE-CLIENTS_hl5cux.png'
    };
  },
  components: {
    BaseButton,
    IconAdd
  }
};
</script>

<style scoped>
.tenant-client-list-empty {
  background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1590460151/BrowTricks/Action_page_background_zlpen3.png');
}
</style>

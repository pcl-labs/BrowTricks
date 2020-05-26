<template>
  <LayoutFixedScrollable>
    <BaseHeader slot="header" class="bg-primary text-on-primary shadow-4dp">
      <IconArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Clients</span>
      <IconAdd slot="detail-primary" class="h-6 w-6 fill-current" />
    </BaseHeader>
    <div slot="content" class="h-full">
      <div class="h-full">
        <TenantClientListEmpty />
      </div>
    </div>
  </LayoutFixedScrollable>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import IconArrowBack from '@/assets/icons/arrow_back.svg';
import IconAdd from '@/assets/icons/add.svg';
import TenantClientListEmpty from '@/components/TenantClientListEmpty.vue';

export default {
  name: 'TenantClientMagenement',
  data() {
    return {
      clients: []
    };
  },
  components: {
    BaseHeader,
    LayoutFixedScrollable,
    IconArrowBack,
    IconAdd,
    TenantClientListEmpty
  }
};
</script>

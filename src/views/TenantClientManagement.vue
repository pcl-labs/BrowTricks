<template>
  <LayoutFixedScrollable>
    <BaseHeader slot="header" class="bg-primary text-on-primary shadow-4dp">
      <IconArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Clients</span>
      <IconAdd slot="detail-primary" class="h-6 w-6 fill-current" />
    </BaseHeader>
    <div slot="content" class="h-full">
      <div v-if="dataFetched" class="h-full">
        <TenantClientList v-if="clients.length > 0" :clients="clients" />
        <TenantClientListEmpty v-else />
      </div>
    </div>
  </LayoutFixedScrollable>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import IconArrowBack from '@/assets/icons/arrow_back.svg';
import IconAdd from '@/assets/icons/add.svg';
import TenantClientList from '@/components/TenantClientList.vue';
import TenantClientListEmpty from '@/components/TenantClientListEmpty.vue';

export default {
  name: 'TenantClientMagenement',
  data() {
    return {
      clients: [],
      dataFetched: false
    };
  },
  components: {
    BaseHeader,
    LayoutFixedScrollable,
    IconArrowBack,
    IconAdd,
    TenantClientList,
    TenantClientListEmpty
  },
  methods: {
    // FIXME : This will be removed later, it's just some dummy data to populate the client list.
    fetchClients() {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(json => {
          this.clients = json;
          this.dataFetched = true;
        });
    }
  },
  created() {
    this.fetchClients();
  }
};
</script>

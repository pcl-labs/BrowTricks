<template>
  <LayoutFixedScrollable>
    <BaseHeader slot="header" class="bg-primary text-on-primary shadow-4dp">
      <IconArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Clients</span>
      <IconAdd slot="detail-primary" class="h-6 w-6 fill-current" />
    </BaseHeader>
    <div slot="content">
      <div v-if="dataFetched">
        <div v-if="clients.length > 0">
          <TenantClientList :clients="clients" />
        </div>
        <div v-else class="mt-auto pb-20 px-8">
          <TenantClientListEmpty />
        </div>
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

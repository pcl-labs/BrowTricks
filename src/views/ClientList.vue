<template>
  <PageContentBoard>
    <div class="my-4 px-4">
      <div class="search-box">
        <MaterialInput
          v-model="query"
          :immediate-input="true"
          label="Search"
          placeholder="Search by name, number or email"
        />
      </div>
      <div v-for="(client, key) in clients" :key="key">
        <h6
          v-if="showLetter(clients[key - 1], client)"
          class="p-3 tg-caption-mobile"
        >
          {{ client.firstName && client.firstName[0].toUpperCase() }}
        </h6>

        <router-link
          :to="{
            name: 'ClientInfo',
            params: { slug: tenantSlug, clientId: client.id }
          }"
        >
          <ClientListItem :client="client" />
        </router-link>
      </div>
      <infinite-loading :identifier="infiniteId" @infinite="fetchClients" />
    </div>

    <portal to="HeaderAction">
      <router-link
        class="tg-color-label-mobile flex flex-row items-center py-1 px-2"
        :to="{
          name: 'ClientItemAdd'
        }"
      >
        <IconAdd class="mr-2 text-background text-opacity-high fill-current" />
        Add client
      </router-link>
    </portal>
  </PageContentBoard>
</template>

<script>
import ClientListItem from '@/components/client/ClientListItem';
import PageContentBoard from '@/components/PageContentBoard';
import IconAdd from '@/assets/icons/add.svg';
import { ClientService } from '@whynotearth/meredith-axios';
import { debounce } from 'lodash-es';

export default {
  name: 'ClientList',
  components: {
    IconAdd,
    PageContentBoard,
    ClientListItem
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      logoUrl:
        'https://res.cloudinary.com/whynotearth/image/upload/v1585738963/BrowTricks/_0003_MANAGE-CLIENTS_hl5cux.png',
      clients: [],
      page: 0,
      query: '',
      infiniteId: +new Date()
    };
  },
  watch: {
    query() {
      this.reset();
    }
  },
  methods: {
    showLetter(prev, current) {
      if (!prev) return true;

      const getPrevFirstCharacter =
        prev && prev.firstName && prev.firstName[0].toUpperCase();
      const getCurrentFirstCharacter =
        current && current.firstName && current.firstName[0].toUpperCase();

      return getPrevFirstCharacter !== getCurrentFirstCharacter;
    },
    fetchClients($state) {
      this.loading = true;
      return ClientService.clients1({
        companySlug: process.env.VUE_APP_COMPANY_SLUG,
        tenantSlug: this.tenantSlug,
        page: this.page,
        query: this.query
      })
        .then(response => {
          const clients = response.records;
          if (clients.length) {
            this.page += 1;
            this.clients.push(...clients);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(() => {
          $state.error();
        });
    },
    reset: debounce(
      function() {
        this.page = 0;
        this.clients = [];
        this.infiniteId += 1;
      },
      300,
      { maxWait: 3000 }
    )
  }
};
</script>

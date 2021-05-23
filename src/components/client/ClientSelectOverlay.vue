<template>
  <BaseOverlayPage :isOpen="isOpen" @close="close" title="Select Client">
    <div class="px-4">
      <div class="sticky py-1 bg-background top-0 z-20">
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
          class="tg-caption-mobile"
        >
          {{ client.firstName && client.firstName[0].toUpperCase() }}
        </h6>

        <ClientListItem
          :key="client.id"
          :client="client"
          @select="onSelectClient(client)"
        >
          <template #end>
            <IconCheck
              v-if="client.id === selectedId"
              class="fill-current w-6 h-6 text-on-background text-opacity-medium"
            />
          </template>
        </ClientListItem>
      </div>
      <infinite-loading :identifier="infiniteId" @infinite="fetchClients" />
    </div>
  </BaseOverlayPage>
</template>

<script>
import ClientListItem from '@/components/client/ClientListItem';
import BaseOverlayPage from '@/components/BaseOverlayPage';
import IconCheck from '@/assets/icons/check.svg';
import { ClientService } from '@whynotearth/meredith-axios';
import { debounce } from 'lodash-es';

export default {
  name: 'ClientSelectOverlay',
  components: { ClientListItem, BaseOverlayPage, IconCheck },
  props: {
    selectedId: {
      type: [String, Number]
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
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
    onSelectClient(client) {
      this.$emit('select', client);
      this.reset();
      this.close();
    },
    close() {
      this.$emit('close');
    },
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
          $state.error(); // To trigger the error function of the infinite loader
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

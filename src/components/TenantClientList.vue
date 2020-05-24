<template>
  <div class="text-left">
    <div v-for="(letter, index) in letters" :key="index">
      <hr :class="[index === 0 ? 'border-transparent mb-2' : 'mb-1']" />
      <div class="px-6">
        <div class="uppercase tg-caption-mobile mb-4">{{ letter }}</div>
        <BaseLineItem
          v-for="(client, index) in sortedClients[letter]"
          :key="client.id"
          :class="[
            index === sortedClients[letter].length - 1 ? 'mb-4' : 'mb-8'
          ]"
        >
          <span slot="title">{{ client.name }}</span>
          <div slot="subtitle-primary" class="opacity-medium truncate">
            {{ client.phone }} - {{ client.email }}
          </div>
        </BaseLineItem>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLineItem from '@/components/BaseLineItem.vue';

export default {
  name: 'TenantClientList',
  data() {
    return {
      sortedClients: {}
    };
  },
  components: {
    BaseLineItem
  },
  props: {
    clients: Array
  },
  computed: {
    letters() {
      return Object.keys(this.sortedClients).sort();
    }
  },
  methods: {
    // FIXME : This will be removed later, we will receive sorted results from back-end
    sortClients() {
      this.clients.forEach(client => {
        const firstLetter = client.name[0];
        if (firstLetter in this.sortedClients) {
          // could do binary search and then insertion, just going to push and re-sort as the hardcoded clients list is short
          this.sortedClients[firstLetter].push(client);
          this.sortedClients[firstLetter].sort((client1, client2) => {
            return client1.name.localeCompare(client2.name);
          });
        } else {
          this.sortedClients[firstLetter] = [client];
        }
      });
    }
  },
  created() {
    this.sortClients();
  }
};
</script>

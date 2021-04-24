<template>
  <PageContentBoard>
    <div class="mb-1">
      <div v-for="(user, key) in users" :key="key">
        <h6
          v-if="showLetter(users[key - 1], user)"
          class="p-3 tg-caption-mobile"
        >
          {{ user.firstName && user.firstName[0].toUpperCase() }}
        </h6>

        <router-link
          :to="{
            name: 'SuperAdminUserView',
            params: { userId: user.id, user }
          }"
        >
          <ClientListItem :client="user" type="tenant" />
        </router-link>
      </div>
    </div>
  </PageContentBoard>
</template>

<script>
import ClientListItem from '@/components/client/ClientListItem';
import PageContentBoard from '@/components/PageContentBoard';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SuperAdminUsers',
  components: {
    PageContentBoard,
    ClientListItem
  },
  data() {
    return {};
  },
  async created() {
    this.loadingUpdate(true);
    await this.fetchUsers();
    this.loadingUpdate(false);
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('admin', ['fetchUsers']),
    showLetter(prev, current) {
      if (!prev) return true;

      const getPrevFirstCharacter =
        prev && prev.firstName && prev.firstName[0].toUpperCase();
      const getCurrentFirstCharacter =
        current && current.firstName && current.firstName[0].toUpperCase();

      return getPrevFirstCharacter !== getCurrentFirstCharacter;
    }
  },
  computed: {
    ...mapState('admin', ['users'])
  }
};
</script>

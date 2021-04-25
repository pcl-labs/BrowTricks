<template>
  <PageContentBoard>
    <div class="my-4 p-4">
      <div class="sticky top-0">
        <MaterialInput
          v-model="query"
          :immediate-input="true"
          label="Search"
          placeholder="Search by names and numbers"
        />
      </div>
      <div v-for="(user, key) in users" :key="key">
        <h6 v-if="showLetter(users[key - 1], user)" class="tg-caption-mobile">
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
      <InfiniteLoading
        spinner="spiral"
        :identifier="infiniteId"
        @infinite="fetchUsers"
      />
    </div>
  </PageContentBoard>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ClientListItem from '@/components/client/ClientListItem';
import PageContentBoard from '@/components/PageContentBoard';
import { UserService } from '@whynotearth/meredith-axios';
import { debounce } from 'lodash-es';

export default {
  name: 'SuperAdminUsers',
  components: {
    PageContentBoard,
    ClientListItem,
    InfiniteLoading
  },
  data() {
    return {
      users: [],
      page: 0,
      query: '',
      infiniteId: +new Date()
    };
  },
  watch: {
    query() {
      this.search();
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
    fetchUsers($state) {
      return UserService.users1({ page: this.page, query: this.query })
        .then(response => {
          const users = response.records;
          if (users.length) {
            this.page += 1;
            this.users.push(...users);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(() => {
          $state.error();
        });
    },
    search: debounce(
      function() {
        this.page = 0;
        this.users = [];
        this.infiniteId += 1;
      },
      300,
      { maxWait: 3000 }
    )
  }
};
</script>

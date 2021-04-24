<template>
  <PageContentBoard background="bg-pattern">
    <div class="pb-20">
      <HeaderHeroSection>
        <!-- header -->
        <div>
          <h1
            class="tg-h2-mobile text-opacity-high text-on-background uppercase flex mb-2 items-center"
          >
            <img class="mb-4" :src="logo" alt="user-logo" />
          </h1>
        </div>

        <!-- content -->
        <router-link
          :to="{ name: 'SuperAdminTenantsList' }"
          class="max-w-md mx-auto w-full h-full"
        >
          <ExpansionPanel title="Tenants">
            <template #preIcon>
              <IconUser class="h-4 w-4 fill-current" />
            </template>
          </ExpansionPanel>
        </router-link>
      </HeaderHeroSection>
    </div>
  </PageContentBoard>
</template>

<script>
import HeaderHeroSection from '@/components/HeaderHeroSection.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import IconUser from '@/assets/icons/user-nocircle.svg';

export default {
  name: 'SuperAdmin',
  data: () => ({
    isTutorialsModalOpen: false,
    logo: process.env.VUE_APP_LOGO3_URL
  }),
  components: {
    PageContentBoard,
    HeaderHeroSection,
    ExpansionPanel,
    IconUser
  }
};
</script>

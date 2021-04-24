<template>
  <PageContentBoard background="bg-pattern">
    <div class="pb-20">
      <HeaderHeroSection>
        <!-- header -->
<<<<<<< HEAD
        <div class="flex flex-col mb-8 items-center">
          <img class="h-20 mx-auto" :src="logo" alt="logo" />
          <h1 class="tg-h2-mobile text-opacity-high text-on-background">
            Welcome Back Boss!
=======
        <div>
          <h1
            class="tg-h2-mobile text-opacity-high text-on-background uppercase flex mb-2 items-center"
          >
            <img class="mb-4" :src="logo" alt="user-logo" />
>>>>>>> 6f5ee89 (feat: super admin page)
          </h1>
        </div>

        <!-- content -->
<<<<<<< HEAD
        <div class="mb-8 max-w-md mx-auto w-full h-full">
          <router-link :to="{ name: 'SuperAdminUsers' }">
            <ExpansionPanel title="Users" />
          </router-link>
        </div>
=======
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
>>>>>>> 6f5ee89 (feat: super admin page)
      </HeaderHeroSection>
    </div>
  </PageContentBoard>
</template>

<script>
import HeaderHeroSection from '@/components/HeaderHeroSection.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
<<<<<<< HEAD

export default {
  name: 'SuperAdmin',
  data() {
    return {
      logo: process.env.VUE_APP_LOGO2_URL
    };
  },
  components: {
    PageContentBoard,
    HeaderHeroSection,
    ExpansionPanel
=======
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
>>>>>>> 6f5ee89 (feat: super admin page)
  }
};
</script>

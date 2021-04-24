<template>
  <PageContentBoard background="bg-pattern">
    <div class="pb-20">
      <HeaderHeroSection>
        <!-- header -->
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f2b95d1 (feat: super admin page)
        <div class="flex flex-col mb-8 items-center">
          <img class="h-20 mx-auto" :src="logo" alt="logo" />
          <h1 class="tg-h2-mobile text-opacity-high text-on-background">
            Welcome Back Boss!
<<<<<<< HEAD
=======
        <div>
          <h1
            class="tg-h2-mobile text-opacity-high text-on-background uppercase flex mb-2 items-center"
          >
            <img class="mb-4" :src="logo" alt="user-logo" />
>>>>>>> 6f5ee89 (feat: super admin page)
=======
>>>>>>> f2b95d1 (feat: super admin page)
          </h1>
        </div>

        <!-- content -->
<<<<<<< HEAD
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
=======
        <div class="mb-8 max-w-md mx-auto w-full h-full">
          <router-link :to="{ name: 'SuperAdminTenantsList' }">
            <ExpansionPanel title="Tenants" />
          </router-link>
        </div>
>>>>>>> f2b95d1 (feat: super admin page)
      </HeaderHeroSection>
    </div>
  </PageContentBoard>
</template>

<script>
import HeaderHeroSection from '@/components/HeaderHeroSection.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
<<<<<<< HEAD
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
=======
>>>>>>> f2b95d1 (feat: super admin page)

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
<<<<<<< HEAD
    ExpansionPanel,
    IconUser
>>>>>>> 6f5ee89 (feat: super admin page)
=======
    ExpansionPanel
>>>>>>> f2b95d1 (feat: super admin page)
  }
};
</script>

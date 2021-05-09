<template>
  <PageContentBoard background="bg-pattern">
    <div class="pb-20">
      <HeaderHeroSection>
        <!-- header -->
        <div class="flex flex-col mb-8 items-center">
          <img class="h-20 mx-auto" :src="logo" alt="logo" />
          <h1 class="tg-h2-mobile text-opacity-high text-on-background">
            Welcome Back Boss!
          </h1>
        </div>

        <!-- content -->
        <div class="mb-8 max-w-md mx-auto w-full h-full">
          <router-link :to="{ name: 'SuperAdminUsers' }">
            <ExpansionPanel title="Users" />
          </router-link>
        </div>
      </HeaderHeroSection>
    </div>
  </PageContentBoard>
</template>

<script>
import HeaderHeroSection from '@/components/HeaderHeroSection.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';

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
  }
};
</script>

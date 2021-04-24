<template>
  <PageContentBoard background="bg-pattern">
    <div class="pb-20">
      <HeaderHeroSection>
        <!-- header -->
        <div class="flex flex-col mb-8 items-center">
          <img class="h-20 mx-auto" :src="logo" alt="logo" />
          <h1 class="tg-h2-mobile text-opacity-high text-on-background">
            {{ user.firstName }} {{ user.lastName }}
          </h1>
          <div
            class="mt-4 space-y-1 flex flex-col items-center tg-caption-mobile underline"
          >
            <a :href="`tel:${user.phoneNumber}`">
              {{ user.phoneNumber }}
            </a>
            <a :href="`mailto:${user.email}`">
              {{ user.email }}
            </a>
          </div>
        </div>

        <!-- content -->
        <div class="mb-8 max-w-md mx-auto w-full h-full">
          <Button
            title="Send password reset email"
            background="bg-brand6"
            textColor="text-on-brand6"
            radius="rounded-full"
            :loading="loading"
            @clicked="submit(userId)"
          />
        </div>
      </HeaderHeroSection>
    </div>
  </PageContentBoard>
</template>

<script>
import HeaderHeroSection from '@/components/HeaderHeroSection.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import { UserService } from '@whynotearth/meredith-axios';
import { mapActions } from 'vuex';

export default {
  name: 'SuperAdminUserView',
  components: {
    PageContentBoard,
    HeaderHeroSection
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      logo: process.env.VUE_APP_LOGO2_URL,
      userId: this.$route.params.userId,
      loading: false
    };
  },
  created() {
    if (!this.user) this.$router.push({ name: 'SuperAdminUsers' });
  },
  methods: {
    ...mapActions('alerter', ['show']),
    async submit(userId) {
      try {
        this.loading = true;
        await UserService.resetPassword({ userId });
      } catch (error) {
        this.show({
          text: "Couldn't send reset email, try again or contact us.",
          class: '',
          button: {
            title: 'Contact Us',
            action() {
              window.open('https://browtricksproductsorg.zendesk.com/');
            }
          }
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

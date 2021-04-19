<template>
  <div class="bg-brand6">
    <div class="max-w-screen-xxl mx-auto py-16 px-2 md:px-16">
      <div
        class="flex flex-col md:flex-row justify-between text-left px-10 md:px-0 mb-12 md:mb-0"
      >
        <nav class="mb-10 md:mb-0">
          <h3 class="list-title">Quick Links</h3>
          <ul class="list-items">
            <li class="mb-2">
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li class="mb-2 md:mb-0">
              <router-link :to="{ name: 'AuthLogin' }">Log In</router-link>
            </li>
          </ul>
        </nav>

        <nav class="mb-10 md:mb-0">
          <h3 class="list-title">Follow</h3>
          <ul class="list-items">
            <li class="mb-2">
              <router-link :to="{ name: 'Home' }">Facebook</router-link>
            </li>
            <li class="mb-2 md:mb-0">
              <router-link :to="{ name: 'Home' }">Instagram</router-link>
            </li>
          </ul>
        </nav>

        <nav class="mb-10 md:mb-0">
          <h3 class="list-title">Stay In Touch</h3>
          <ul class="list-items">
            <li class="mb-2 md:mb-0">
              <a href="https://browtricksproductsorg.zendesk.com/">Help</a>
            </li>
            <li class="mb-2">
              <router-link :to="{ name: 'Home' }">
                Terms and Conditions
              </router-link>
            </li>
            <li class="mb-2 md:mb-0">
              <router-link :to="{ name: 'PrivacyPolicy' }">
                Privacy Policy
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <img
        :src="BrowTricksLogoWithCrown"
        class="mx-auto max-w-sm px-10 md:px-0"
      />
    </div>
  </div>
</template>

<script>
import BrowTricksLogoWithCrown from '@/assets/icons/browtricks-logo-with-crown.png';

export default {
  name: 'NavigationFooter',
  data() {
    return {
      BrowTricksLogoWithCrown
    };
  },
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style scoped>
.list-title {
  @apply mb-8 text-on-brand6 text-opacity-high uppercase;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}

.list-items > li > a {
  @apply py-2 inline-block text-on-brand6 text-opacity-75;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}
</style>

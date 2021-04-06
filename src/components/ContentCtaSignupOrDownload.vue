<template>
  <div class="bg-primary">
    <div class="flex flex-col md:flex-row w-full">
      <div class="my-auto app-image mx-auto flex-shrink-0 md:order-2">
        <img
          class="px-6"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1605631504/BrowTricks/static_v2/home-app_mea1yu.png"
          alt="app"
        />
      </div>
      <div
        class="px-4 py-16 md:px-16 md:py-24 my-16 mx-2 md:mx-auto max-w-2xl text-left bg-primary-light"
      >
        <h2 class="tg-home-h1-mobile md:tg-home-h1-desktop mb-6 md:mb-8">
          {{ APPNAME }}
        </h2>
        <p class="tg-body-mobile mb-10">
          Brow Tricks Beauty lets you snap, store, and see client photos and
          vidoes easily. This is great for remembering every single detail with
          a visual history of client's styles and progress. We recommend using
          this feature to deepen relationships with clients and connect with
          them like never before.
        </p>

        <div class="flex flex-wrap items-center">
          <!-- <Button
            class="cta-button mb-4 sm:mb-0"
            margin="mr-4"
            :width="null"
            background="bg-brand6"
            textColor="text-on-brand6"
            radius="rounded-md"
            title="Sign Up"
            :to="{ name: 'AuthSignup' }"
          />

          <Button
            v-if="isMobileApp"
            class="cta-button mb-4 sm:mb-0"
            margin="mr-4"
            :width="null"
            background="bg-brand6"
            textColor="text-on-brand6"
            radius="rounded-md"
            title="Log in"
            :to="{ name: 'AuthLogin' }"
          /> -->
          <ButtonAppleStore className="mr-4" />
          <ButtonGooglePlay className="mr-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonGooglePlay from '@/components/inputs/ButtonGooglePlay';
import ButtonAppleStore from '@/components/inputs/ButtonAppleStore';
export default {
  name: 'ContentCtaSignupOrDownload',
  components: { ButtonGooglePlay, ButtonAppleStore },
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style scoped>
.app-image {
  width: 288px;
}

.cta-button {
  width: 148px;
}
</style>

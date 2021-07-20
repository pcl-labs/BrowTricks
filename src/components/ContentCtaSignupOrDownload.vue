<template>
  <div class="md:bg-phones-image bg-cover bg-right bg-no-repeat bg-primary">
    <div
      class="mx-auto max-w-screen-xxl flex flex-col md:flex-row justify-between w-full"
    >
      <img
        src="https://res.cloudinary.com/whynotearth/image/upload/v1618759425/BrowTricks/Phones_Full_p86ypn.png"
        class="md:hidden"
      />
      <div
        class="m-2 mt-0 md:m-16 px-4 py-6 md:p-16 md:max-w-2xl text-left bg-patch bg-pattern-defaults bg-primary-light"
      >
        <h2 class="tg-home-h1-mobile md:tg-home-h1-desktop mb-6 md:mb-8">
          {{ APPNAME }}
        </h2>
        <p class="tg-home-body mb-10">
          Brow Tricks Beauty lets you snap, store, and see client photos and
          vidoes easily. This is great for remembering every single detail with
          a visual history of client's styles and progress. We recommend using
          this feature to deepen relationships with clients and connect with
          them like never before.
        </p>

        <!-- <div class="flex flex-wrap items-center">
          <Button
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
          />
          <ButtonAppleStore className="mr-4" />
          <ButtonGooglePlay className="mr-4" />
        </div> -->
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
.cta-button {
  width: 148px;
}
</style>

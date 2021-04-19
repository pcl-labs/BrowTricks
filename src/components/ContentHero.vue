<template>
  <div class="md:bg-phones-image bg-cover bg-right bg-no-repeat bg-home-green">
    <div
      class="mx-auto max-w-screen-xxl md:h-auto flex flex-col md:flex-row justify-between w-full"
    >
      <img
        src="https://res.cloudinary.com/whynotearth/image/upload/v1618759425/BrowTricks/Phones_Full_p86ypn.png"
        class="md:hidden"
      />
      <div
        class="m-2 mt-0 md:m-16 px-4 py-6 md:p-16 max-w-2xl text-left bg-home-green-light"
      >
        <h2 class="tg-home-h1-mobile md:tg-home-h1-desktop mb-6 md:mb-8">
          You be a brow boss, let us do the organizing.
        </h2>
        <h3 class="my-4 tg-home-h3-mobile md:tg-home-h3-desktop">
          {{ APPNAME }}. {{ SLOGAN }}
        </h3>

        <div class="flex flex-row justify-start">
          <Button
            class="cta-button"
            :width="null"
            margin="mr-4"
            background="bg-brand6"
            textColor="text-on-brand6"
            radius="rounded-md"
            title="Sign Up"
            :to="{ name: 'AuthSignup' }"
          />

          <Button
            class="cta-button font-bold"
            :width="null"
            margin="mr-4"
            radius="rounded-md"
            title="Log in"
            :to="{ name: 'AuthLogin' }"
          />
        </div>
        <hr
          class="mx-20 my-10 w-1/4 border-on-background border-opacity-divider"
        />
        <div class="flex flex-wrap items-center">
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
    },
    SLOGAN() {
      return process.env.VUE_APP_SLOGAN;
    }
  }
};
</script>

<style scoped>
.app-image {
  width: 288px;
}

.cta-button {
  width: 138px;
}
</style>

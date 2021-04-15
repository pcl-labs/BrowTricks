<template>
  <div class="bg-home-green">
    <div
      class="relative mx-auto max-w-screen-xxl flex flex-col md:flex-row justify-between w-full"
    >
      <img
        src="@/assets/phones.png"
        alt="app"
        class="mx-2 md:mx-4 md:order-2"
      />
      <div
        class="px-4 py-6 md:py-14 md:px-16 my-16 mx-2 md:mx-4 max-w-2xl text-left bg-home-green-light"
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

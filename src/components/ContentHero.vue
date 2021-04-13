<template>
  <div class="bg-home-green">
    <div class="flex flex-col md:flex-row w-full">
      <div class="my-auto app-image mx-auto flex-shrink-0 md:order-2">
        <img
          class="px-6"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1605631504/BrowTricks/static_v2/home-app_mea1yu.png"
          alt="app"
        />
      </div>
      <div
        class="px-4 py-6 md:py-14 md:px-16 my-16 mx-2 md:mx-auto max-w-2xl text-left bg-home-green-light"
      >
        <h2 class="tg-home-h1-mobile md:tg-home-h1-desktop mb-6 md:mb-8">
          You be a brow boss, let us do the organizing.
        </h2>
        <h3 class="my-4 tg-home-h3-mobile md:tg-home-h3-desktop">
          {{ APPNAME }}. {{ SLOGAN }}
        </h3>

        <div class="grid grid-cols-2 gap-4">
          <Button
            class="cta-button mb-4 sm:mb-0"
            :width="null"
            background="bg-brand6"
            textColor="text-on-brand6"
            radius="rounded-md"
            title="Sign Up"
            :to="{ name: 'AuthSignup' }"
          />

          <Button
            class="cta-button mb-4 sm:mb-0 font-bold"
            :width="null"
            radius="rounded-md"
            title="Log in"
            :to="{ name: 'AuthLogin' }"
          />
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

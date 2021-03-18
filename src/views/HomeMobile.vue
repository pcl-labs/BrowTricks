<template>
  <div class="py-4 min-h-vh100 grid place-items-center">
    <div class="px-4">
      <h2 class="text-center tg-h1-mobile md:tg-h1-desktop mb-8">
        You be a brow boss, let us do the organizing.
      </h2>
      <h1 class="tg-h3-mobile md:tg-h1-mobile mb-8">
        {{ APPNAME }}. {{ SLOGAN }}
      </h1>
      <div class="flex flex-wrap items-center justify-center">
        <Button
          class="cta-button flex-grow mb-4"
          margin="mx-4"
          width="w-auto"
          background="bg-brand6"
          textColor="text-on-brand6"
          radius="rounded-md"
          title="Sign Up"
          :to="{ name: 'AuthSignup' }"
        />
        <Button
          class="cta-button flex-grow mb-4"
          margin="mx-4"
          width="w-auto"
          background="bg-brand6"
          textColor="text-on-brand6"
          radius="rounded-md"
          title="Log in"
          :to="{ name: 'AuthLogin' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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

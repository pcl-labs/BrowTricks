<template>
  <header class="sticky bg-brand6 top-0 z-20">
    <div
      class="mx-auto px-2 md:px-4 h-20 max-w-screen-xxl flex justify-between items-center"
    >
      <div class="w-full md:w-auto flex items-center justify-between">
        <BrowTricksCrown class="py-2" />
        <!-- hamburger menu -->
        <a
          @click.stop="isMenuVisible = !isMenuVisible"
          class="cursor-pointer md:hidden menu-hamburger"
        >
          <IconHamburger class="text-on-brand6" />

          <transition name="menu-fade" mode="out-in">
            <nav
              @click.stop
              v-click-outside="() => (isMenuVisible = false)"
              v-if="isMenuVisible"
              class="menu-content"
            >
              <ul class="flex flex-col bg-background shadow-md py-2 rounded-md">
                <li class="w-full">
                  <router-link
                    class="text-on-background block px-4 py-2 hover:bg-primary"
                    :to="{ name: 'Home' }"
                    exact
                  >
                    Home
                  </router-link>
                </li>
                <li class="w-full">
                  <a
                    class="block px-4 py-2 hover:bg-primary text-on-background"
                    href="#section-pricing"
                  >
                    Pricing
                  </a>
                </li>
                <li class="w-full">
                  <a
                    class="block px-4 py-2 hover:bg-primary text-on-background"
                    href="https://browtricksproductsorg.zendesk.com/"
                  >
                    Help
                  </a>
                </li>
                <li class="w-full">
                  <router-link
                    class="block px-4 py-2 hover:bg-primary text-on-background"
                    :to="{ name: 'AuthLogin' }"
                  >
                    Log in
                  </router-link>
                </li>
              </ul>
            </nav>
          </transition>
        </a>
      </div>

      <!-- horizontal menu -->
      <nav class="hidden md:flex menu-horizontal">
        <ul class="flex items-center tg-h3-mobile text-white select-none">
          <li class="h-full flex items-center">
            <router-link
              class="mx-1 p-2 rounded-md"
              :to="{ name: 'Home' }"
              exact
            >
              Home
            </router-link>
          </li>
          <li class="h-full flex items-center">
            <a class="mx-1 p-2 rounded-md" href="#section-pricing">
              Pricing
            </a>
          </li>
          <li class="h-full flex items-center">
            <a
              class="mx-1 p-2 rounded-md"
              href="https://browtricksproductsorg.zendesk.com/"
            >
              Help
            </a>
          </li>
          <li class="h-full flex items-center">
            <router-link
              class="mx-1 p-2 rounded-md"
              :to="{ name: 'AuthLogin' }"
            >
              Log in
            </router-link>
          </li>
        </ul>

        <Button
          padding="py-1 px-3 md:px-4 md:ml-3"
          radius="rounded-md"
          :width="null"
          title="Try it now"
          :to="{ name: 'AuthSignup' }"
        />
      </nav>
    </div>
  </header>
</template>

<script>
import IconHamburger from '@/assets/icons/hamburger.svg';
import BrowTricksCrown from '@/assets/icons/browtricks_crown.svg';

export default {
  name: 'HeaderNavigation',
  components: { IconHamburger, BrowTricksCrown },
  data: () => ({
    isMenuVisible: false
  }),
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style scoped>
.menu-hamburger .router-link-active {
  @apply bg-primary bg-opacity-disabled;
}
.menu-horizontal .router-link-active {
  @apply bg-on-background-image bg-opacity-disabled;
}
.menu-content {
  @apply absolute text-left select-none;
  top: 20px;
  left: 20px;
  width: 180px;
}
</style>

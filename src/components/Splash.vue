<template>
  <div class="h-full flex flex-col justify-center items-center bg-primary">
    <div class="max-w-xl h-full">
      <img
        src="https://res.cloudinary.com/whynotearth/image/upload/v1598336510/BrowTricks/static_v2/brandcover_lo3i0l.jpg"
        class="h-screen md:max-h-screen object-cover"
      />
    </div>
    <div class="absolute w-screen h-full flex justify-center items-center">
      <BaseSpinner borderColor="border-brand2" classNames="spinner" />
    </div>
  </div>
</template>

<script>
import BaseSpinner from '@/components/BaseSpinner.vue';

export default {
  name: 'Splash',
  components: {
    BaseSpinner
  }
};
</script>

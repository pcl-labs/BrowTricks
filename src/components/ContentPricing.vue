<template>
  <div class="flex flex-col">
    <BaseCard
      className="mx-auto max-w-xs flex flex-col text-left"
      padding="p-8"
      rounded="rounded-none"
      shadow="shadow-none"
    >
      <h3 class="heading mb-5">Standard (Free)</h3>
      <p class="mb-5 caption">
        Standard plan created to fit the needs of salons of all sizes.
      </p>
      <dl class="text-left feature-list">
        <dt><IconCheck class="list-tick" /><span>1000+ Users</span></dt>
        <dt><IconCheck class="list-tick" /><span>Client Notes</span></dt>
        <dt><IconCheck class="list-tick" /><span>Client Photos</span></dt>
        <dt><IconCheck class="list-tick" /><span>Ongoing Support</span></dt>
        <dt><IconCheck class="list-tick" /><span>PMU Form Builder</span></dt>
      </dl>
    </BaseCard>

    <Button
      background="bg-brand6"
      textColor="text-on-brand6"
      radius="rounded-md"
      title="Try it now"
      class="my-14"
      :to="{ name: 'AuthSignup' }"
    />
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import IconCheck from '@/assets/icons/check.svg';

export default {
  name: 'ContentPricing',
  components: { BaseCard, IconCheck }
};
</script>

<style scoped>
.heading {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 46px;
}
.caption {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  opacity: 0.6;
}
.feature-list > dt {
  font-family: Roboto, sans-serif;
  font-size: 15px;
  line-height: 18px;
  @apply flex py-2;
}
.list-tick {
  background-color: rgb(3, 4, 19, 0.1);
  @apply w-6 h-6 p-1.5 mr-4 rounded-full;
}
.list-lock {
  @apply text-error w-4 h-4 mr-4;
}
</style>

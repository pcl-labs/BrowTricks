<template functional>
  <div>
    Something went wrong, you can
    <button @click="props.trigger" class="actions">retry</button>
    or
    <a
      target="_blank"
      href="https://browtricksproductsorg.zendesk.com/"
      class="actions"
    >
      contact us.
    </a>
  </div>
</template>

<style scoped>
.actions {
  @apply text-black;
  @apply underline;
  @apply font-semibold;
}
</style>

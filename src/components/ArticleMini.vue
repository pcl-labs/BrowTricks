<template functional>
  <article class="mx-auto max-w-xl px-2 md:px-16 text-center md:text-left">
    <h2
      class="mb-6 md:mb-8 tg-home-h2-mobile md:tg-home-h2-desktop"
      v-text="props.article.title"
    />
    <p class="tg-home-body" v-text="props.article.content" />
  </article>
</template>

<script>
export default {
  name: 'ArticleMini',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

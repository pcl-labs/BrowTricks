<template>
  <ClassicLayout class="bg-background">
    <template #header>
      <HeaderNavigation />
    </template>

    <template #content>
      <ContentHero />

      <div class="hero-video py-16 px-2 md:px-8">
        <div class="p-2 md:p-8 w-full h-full bg-home-pink-light">
          <iframe
            src="https://www.youtube.com/embed/IbKukl8CHYM"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          />
        </div>
      </div>

      <!-- row 1 -->
      <div class="relative box box-1">
        <article
          class="absolute top-0 inset-x-0 mx-auto max-w-3xl px-4 md:px-16 text-center"
        >
          <h2
            class="mb-6 md:mb-8 tg-home-h2-mobile md:tg-home-h2-desktop"
            v-text="articles[0].title"
          />
          <p class="tg-home-body" v-text="articles[0].content" />
        </article>
        <Lines class="mx-auto transform -translate-y-10" />
      </div>

      <!-- row 2 -->
      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-2 box-article md:w-1/2">
          <ArticleMini :article="articles[1]" />
        </div>
        <div class="box box-2 box-video px-4 pb-10 md:px-16 md:py-24 md:w-1/2">
          <iframe
            width="690"
            height="400"
            src="https://www.youtube.com/embed/IbKukl8CHYM"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="mx-auto"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-3 box-article md:w-1/2 md:order-2">
          <ArticleMini :article="articles[2]" />
        </div>
        <div class="box box-3 box-video md:w-1/2">
          <VideoSimple
            class="video-content"
            url="https://res.cloudinary.com/whynotearth/video/upload/v1617688312/browtricks_beauty_pume_form_builder_example_1_kygddc.mp4"
          />
        </div>
      </div>

      <div id="section-pricing">
        <FrameFullWidth>
          <div class="max-w-3xl mx-auto py-10">
            <h2
              class="mb-8 tg-home-h2-mobile md:tg-home-h2-desktop text-center"
            >
              Pricing
            </h2>
            <p class="mb-12">
              Ultrices vitae auctor eu augue ut lectus arcu. Donec et odio
              pellentesque diam volutpat commodo. Eget nunc lobortis mattis
              aliquam faucibus purus in.
            </p>
            <ContentPricing />
          </div>
        </FrameFullWidth>
      </div>

      <ContentCtaSignupOrDownload />

      <NavigationFooter />
    </template>
  </ClassicLayout>
</template>

<script>
import ArticleMini from '@/components/ArticleMini.vue';
import ContentHero from '@/components/ContentHero.vue';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import ContentPricing from '@/components/ContentPricing.vue';
import ContentCtaSignupOrDownload from '@/components/ContentCtaSignupOrDownload.vue';
import NavigationFooter from '@/components/NavigationFooter.vue';
import FrameFullWidth from '@/components/FrameFullWidth';
import VideoSimple from '@/components/player/VideoSimple';
import Lines from '@/assets/lines.svg';

export default {
  name: 'Home',
  components: {
    Lines,
    VideoSimple,
    FrameFullWidth,
    ArticleMini,
    HeaderNavigation,
    ContentHero,
    ContentPricing,
    ContentCtaSignupOrDownload,
    NavigationFooter
  },
  // metaInfo() {
  //   return {
  //     script: [
  //       {
  //         vmid: 'jsonld',
  //         type: 'application/ld+json',
  //         json: {}
  //       }
  //     ]
  //   };
  // },
  computed: {
    reviewVideoUrl() {
      return 'https://res.cloudinary.com/whynotearth/video/upload/v1604388928/BrowTricks/static_v2/home-review-1.mp4';
    },
    APPSLOGAN() {
      return process.env.VUE_APP_SLOGAN;
    },
    SHORTNAME() {
      return process.env.VUE_APP_SHORTNAME;
    },
    LOGO() {
      return process.env.VUE_APP_LOGO_URL;
    },
    articles() {
      return [
        {
          id: 1,
          title: 'Custom PMU forms with eSignatures',
          content:
            'Get PMU forms done faster with legally binding eSignatures. Send, sign and collect signatures in an instant. Compliant with all major eSignature laws including ESIGN Act, UETA, and European eIDAS.'
        },
        {
          id: 2,
          title: 'Manage client video and photos',
          content:
            /* eslint-disable-next-line */
            "Brow Tricks Beauty lets you snap, store, and see client photos and vidoes easily. This is great for remembering every single detail with a visual history of client's styles and progress. We recommend using this feature to deepen relationships with clients and connect with them like never before. "
        },
        {
          id: 3,
          title: 'Rock Your Relationships',
          content:
            'We know your clients are everything to you AND that you can’t always stay on top of them. Do they have a favorite product? Do they have a birthday coming up? Brow Tricks Beauty lets you save unlimited client notes giving you a way to keep relationships personal…and clients coming back.'
        }
      ];
    }
  }
};
</script>

<style scoped>
.logo {
  width: 100px;
}
.store-link {
  width: 180px;
}

.box-1 {
  background-color: #ebbbb6;
}
.box-2 {
  background-color: #ceeadf;
}
.box-3 {
  background-color: #f1e2d7;
}

.box {
  @apply flex;
  @apply items-center;
  background-position: bottom right;
  background-size: contain;
  background-repeat: no-repeat;
}
.box-article {
  @apply py-16;
}
.video-content {
  @apply mx-auto;
  pointer-events: none;
}
.hero-video {
  height: 800px;
  background: linear-gradient(white 50%, #ebbbb6 50%);
}
</style>

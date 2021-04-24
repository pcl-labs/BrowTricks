<template>
  <ClassicLayout class="bg-background">
    <template #header>
      <HeaderNavigation />
    </template>

    <template #content>
      <ContentHero />

      <div class="bg-pink-white py-10 px-2 md:py-16 md:px-16">
        <div class="hero-video mx-auto p-2 md:p-8 w-full bg-home-pink-light">
          <iframe
            src="https://www.youtube.com/embed/IbKukl8CHYM?autoplay=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          />
        </div>
      </div>

      <!-- row 1 -->
      <div class="box-1 w-full">
        <div
          class="mx-auto max-w-screen-xxl flex flex-col lg:flex-row justify-between w-full"
        >
          <div
            class="box box-article lg:w-1/2 lg:order-2 bg-spots bg-pattern-defaults"
          >
            <ArticleMini :article="articles[0]" />
          </div>
          <div class="box px-2 md:px-16">
            <VideoSimple
              class="video-content"
              url="https://res.cloudinary.com/whynotearth/video/upload/v1619174430/BrowTricks/browtricks_features_pink_lvsyzp.mp4"
            />
          </div>
        </div>
      </div>

      <!-- row 2 -->
      <div class="box-2 w-full">
        <div
          class="mx-auto max-w-screen-xxl flex flex-col lg:flex-row justify-between w-full"
        >
          <div class="box box-article lg:w-1/2 bg-spots bg-pattern-defaults">
            <ArticleMini :article="articles[1]" />
          </div>
          <div class="box pb-10 px-2 md:px-16 md:py-24">
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
      </div>
      <div class="box-3 w-full">
        <div
          class="mx-auto max-w-screen-xxl flex flex-col lg:flex-row justify-between w-full"
        >
          <div
            class="box box-article lg:w-1/2 lg:order-2 bg-spots bg-pattern-defaults"
          >
            <ArticleMini :article="articles[2]" />
          </div>
          <div class="box px-2 md:px-16">
            <VideoSimple
              class="video-content"
              url="https://res.cloudinary.com/whynotearth/video/upload/v1619174259/BrowTricks/browtricks_features_tan_obu40a.mp4"
            />
          </div>
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

export default {
  name: 'Home',
  components: {
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
  @apply flex items-center;
}
.box-article {
  @apply py-16;
}
.video-content {
  @apply mx-auto;
  pointer-events: none;
}
.bg-pink-white {
  background: linear-gradient(white 50%, #ebbbb6 50%);
}
.hero-video {
  height: 250px;
  max-width: 1790px;
  box-shadow: 5.725px 6.87px 0px rgba(183, 141, 137, 0.4);
}
@screen md {
  .hero-video {
    height: 800px;
    box-shadow: 20px 24px 0px rgba(183, 141, 137, 0.4);
  }
}
</style>

<template>
  <a
    tabindex="1"
    class="cursor-pointer px-6 mb-4 flex items-center justify-between"
    @click="$emit('select', client)"
  >
    <div class="flex items-center">
      <div>
        <img class="w-10 h-10 rounded-full" :src="avatar" alt="User picture" />
      </div>
      <div class="ml-4">
        <h3 class="tg-base text-on-background text-opacity-high">
          {{ client.firstName }} {{ client.lastName }}
        </h3>
        <h4 class="tg-caption-mobile text-on-background text-opacity-medium">
          {{ client.phoneNumber }}
        </h4>
        <h4 class="tg-caption-mobile text-on-background text-opacity-medium">
          {{ client.email }}
        </h4>
      </div>
    </div>

    <slot name="end" />
  </a>
</template>

<script>
import AvatarCrown from '@/assets/icons/avatar-crown.png';

export default {
  name: 'ClientListItem',
  props: {
    client: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'client'
    }
  },
  computed: {
    avatar() {
      const userAvatar =
          'https://res.cloudinary.com/whynotearth/image/upload/v1595228411/BrowTricks/avatar-placeholder_dphhvx.png',
        alternateAvatar = this.type === 'client' ? userAvatar : AvatarCrown;

      return this.client.avatarUrl || alternateAvatar;
    }
  }
};
</script>

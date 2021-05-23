<template>
  <ul class="space-y-4 ">
    <li>
      <BaseCard className="flex-col space-y-4">
        <RadioInput
          label="Pro ($ 20 / year)"
          className="tg-h3-mobile"
          value="pro"
          v-model="selected"
        />
        <h3>
          Upgrade to Pro for video cloud storage up to 500MB and unlimited PMU
          custom form builder
        </h3>
        <hr class="divide-on-background-image" />
        <ul class="space-y-2">
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              100+ Users
            </span>
          </li>
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              Client Notes
            </span>
          </li>
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              Client Photos
            </span>
          </li>
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              PMU Form Builder
            </span>
          </li>
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              Video Cloud Storage (50 MB)
            </span>
          </li>
          <li class="flex space-x-3">
            <IconLock class="w-4 h-4" />
            <span class="tg-caption-mobile text-on-surface">
              Schedule & Booking
            </span>
          </li>
        </ul>
        <p class="tg-caption-mobile text-on-surface text-center">
          See terms and conditions
        </p>
      </BaseCard>
    </li>
    <li>
      <BaseCard className="flex-col space-y-4">
        <RadioInput
          label="Standard (Free)"
          className="tg-h3-mobile"
          value="free"
          v-model="selected"
        />
        <h3>
          Advanced features for pros who need more customization.
        </h3>
        <hr class="divide-on-background-image" />
        <ul class="space-y-2">
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              100+ Users
            </span>
          </li>
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              Client Notes
            </span>
          </li>
          <li class="flex space-x-3">
            <IconCheck class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              Client Photos
            </span>
          </li>
          <li class="flex space-x-3">
            <IconLock class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              PMU Form Builder
            </span>
          </li>
          <li class="flex space-x-3">
            <IconLock class="w-4 h-4 text-accent fill-current" />
            <span class="tg-caption-mobile text-on-surface">
              Video Cloud Storage (50 MB)
            </span>
          </li>
          <li class="flex space-x-3">
            <IconLock class="w-4 h-4" />
            <span class="tg-caption-mobile text-on-surface">
              Schedule & Booking
            </span>
          </li>
        </ul>
        <!-- <p class="tg-caption-mobile text-on-surface text-center">
          See terms and conditions
        </p> -->
      </BaseCard>
    </li>
  </ul>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import RadioInput from '@/components/inputs/RadioInput';
import IconCheck from '@/assets/icons/check.svg';
import IconLock from '@/assets/icons/lock.svg';

export default {
  components: {
    BaseCard,
    RadioInput,
    IconCheck,
    IconLock
  },
  props: {
    selectedPlan: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: this.selectedPlan
    };
  },
  watch: {
    selected() {
      this.$emit('selected', this.selected);
    }
  }
};
</script>

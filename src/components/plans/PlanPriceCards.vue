<template>
  <ul class="space-y-4">
    <li v-for="plan in plans" :key="plan.id">
      <BaseCard className="flex-col space-y-4">
        <RadioInput
          v-model="selectedPlan"
          :value="plan"
          :label="`${plan.name} ( $${plan.price}/year )`"
          className="tg-h3-mobile"
        />
        <h3>
          Upgrade to {{ plan.name }} for video cloud storage up to 500MB and
          unlimited PMU custom form builder
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
        </ul>
        <!-- TODO: Where to point these terms and conditions? -->
        <a class="tg-caption-mobile text-on-surface text-center">
          See terms and conditions
        </a>
      </BaseCard>
    </li>
    <li :key="freePlan.id">
      <BaseCard className="flex-col space-y-4">
        <RadioInput
          v-model="selectedPlan"
          :value="freePlan"
          :label="freePlan.name"
          className="tg-h3-mobile"
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
        </ul>
        <!-- TODO: Where to point these terms and conditions? -->
        <a class="tg-caption-mobile text-on-surface text-center">
          See terms and conditions
        </a>
      </BaseCard>
    </li>
  </ul>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import RadioInput from '@/components/inputs/RadioInput';
import IconCheck from '@/assets/icons/check.svg';
import IconLock from '@/assets/icons/lock.svg';
import { mapGetters } from 'vuex';

export default {
  name: 'PlanPriceCards',
  components: {
    BaseCard,
    RadioInput,
    IconCheck,
    IconLock
  },
  model: {
    prop: 'plan',
    event: 'selected'
  },
  props: {
    plan: {
      type: Object,
      required: true
    },
    plans: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      freePlan: {
        id: 'free',
        name: 'Standard (Free)'
      }
    };
  },
  computed: {
    ...mapGetters('subscription', ['getActiveSubscription']),

    selectedPlan: {
      get() {
        return this.plan;
      },
      set(val) {
        this.$emit('selected', val);
      }
    }
  },
  created() {
    this.selectedPlan = this.plans.find(
      plan => plan.id === this.getActiveSubscription?.plan?.id
    );
  }
};
</script>

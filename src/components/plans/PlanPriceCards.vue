<template>
  <div>
    <span v-if="loading">Loading plans for you...</span>
    <ul v-else class="space-y-4">
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
            <li class="flex space-x-3">
              <IconLock class="w-4 h-4" />
              <span class="tg-caption-mobile text-on-surface">
                Schedule & Booking
              </span>
            </li>
          </ul>
          <!-- TODO: Where to point these terms and conditions? -->
          <p class="tg-caption-mobile text-on-surface text-center">
            See terms and conditions
          </p>
        </BaseCard>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import RadioInput from '@/components/inputs/RadioInput';
import IconCheck from '@/assets/icons/check.svg';
import IconLock from '@/assets/icons/lock.svg';
import { mapActions } from 'vuex';
import { SubscriptionService } from '@whynotearth/meredith-axios';

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
    }
  },
  data() {
    return {
      loading: false,
      plans: []
    };
  },
  computed: {
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
    this.init();
  },
  methods: {
    ...mapActions('alerter', ['show', 'updateVisibility']),

    async init() {
      try {
        this.loading = true;
        const plans = await SubscriptionService.domain({
          domain: 'browtricks.com'
        });
        this.plans = [...plans];
        this.selectedPlan = plans[0]; // TODO: Replace this with active subscription of the user.
      } catch {
        this.show({
          text: 'Error fetching plans, refreshing may help',
          button: {
            title: 'Okay',
            action: () => this.updateVisibility(false)
          }
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

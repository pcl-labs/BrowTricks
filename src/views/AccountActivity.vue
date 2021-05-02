<template>
  <div class="p-4">
    <template v-for="(data, index) in mockData">
      <ActivityDetailsRow
        :details="data"
        :key="index"
        @click="
          $router.push({
            name: 'TransactionDetails',
            params: { transactionDetails: data }
          })
        "
      >
        <!-- replace this with actaul image coming from api -->
        <IconRectangle />
      </ActivityDetailsRow>
    </template>
  </div>
</template>

<script>
import ActivityDetailsRow from '@/components/activity/ActivityDetailsRow.vue';
import IconRectangle from '@/assets/icons/Rectangle.svg';

export default {
  name: 'AccountActivity',
  components: {
    ActivityDetailsRow,
    IconRectangle
  },
  data() {
    return {
      // replace mockData with data coming from api
      mockData: [
        {
          name: 'Paul Chris Luke',
          date: '28 June, 2020',
          subType: 'Enterprise',
          total: '10.80'
        },
        {
          name: 'Paul Chris Luke',
          date: '28 May, 2020',
          subType: 'Enterprise',
          total: '10.80'
        },
        {
          name: 'Paul Chris Luke',
          date: '28 April, 2020',
          subType: 'Enterprise',
          total: '10.80'
        }
      ]
    };
  },
  methods: {
    test() {
      console.log('test');
    }
  }
};
</script>

import { SubscriptionService } from '@whynotearth/meredith-axios';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getPaymentDetails(context, params) {
      return SubscriptionService.payments(params);
    }
  },
  getters: {}
};

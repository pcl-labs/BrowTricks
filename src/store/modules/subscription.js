import { SubscriptionService } from '@whynotearth/meredith-axios';

export default {
  namespaced: true,
  state: {
    activeSubscriptions: []
  },
  getters: {
    getActiveSubscription: state => state.activeSubscriptions[0]
  },
  actions: {
    fetchActiveSubscriptions({ commit }, tenantSlug) {
      return new Promise((resolve, reject) => {
        SubscriptionService.subscriptions1({ tenantSlug })
          .then(response => {
            commit('setActiveSubscriptions', response);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  mutations: {
    setActiveSubscriptions(state, payload) {
      state.activeSubscriptions = [...payload];
    }
  }
};

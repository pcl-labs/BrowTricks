import { loadStripe } from '@stripe/stripe-js';

export default {
  namespaced: true,
  state: {
    cardInfo: {
      firstName: '',
      lastName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: ''
    },
    billingInfo: {
      country: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: ''
    }
  },
  mutations: {
    cardInfoUpdate(state, payload) {
      state.cardInfo = { ...payload };
    },
    billingInfoUpdate(state, payload) {
      state.billingInfo = payload;
    }
  },
  actions: {
    async generateToken({ commit }, payload) {
      let stripe = loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
      let token = await stripe.createToken(
        ...payload.cardData,
        payload.additionalData
      );
      console.log(token);
    },
    updateCardElements({ commit }, payload) {
      commit('cardInfoUpdate', payload);
    }
  },
  getters: {
    loadingGet(state) {
      return state.loading;
    }
  }
};

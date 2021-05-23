import { CompanyService } from '@whynotearth/meredith-axios';

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
    },
    token: '',
    stripeKey: '',
    paymentMethods: []
  },
  mutations: {
    cardInfoUpdate(state, payload) {
      state.cardInfo = { ...payload };
    },
    billingInfoUpdate(state, payload) {
      state.billingInfo = payload;
    },
    updateToken(state, payload) {
      state.token = payload;
    },
    updateStripeKey(state, payload) {
      state.stripeKey = payload;
    }
  },
  actions: {
    getStripePublishableKeys({ commit }) {
      return new Promise((resolve, reject) => {
        const params = {
          companyId: process.env.VUE_APP_COMPANY_ID
        };
        CompanyService.publishable(params)
          .then(res => {
            commit('updateStripeKey', res.key);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    generateToken({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { cardNumber, cardExpiry, cardCvc } = payload.cardData;
        payload.stripe
          .createToken(cardNumber, cardExpiry, cardCvc, payload.additionalData)
          .then(res => {
            commit('updateToken', res.token);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateCardElements({ commit }, payload) {
      commit('cardInfoUpdate', payload);
    }
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getStripeKey: state => {
      return state.stripeKey;
    }
  }
};

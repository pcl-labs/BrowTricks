import {
  PaymentMethodService,
  CompanyService
} from '@whynotearth/meredith-axios';

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
    },
    updatePaymentMethods(state, payload) {
      state.paymentMethods = payload;
    },
    addPaymentMethod(state, payload) {
      state.paymentMethods.push(payload);
    }
  },
  actions: {
    getStripePublishableKeys({ commit }, payload) {
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
      let { cardNumber, cardExpiry, cardCvc } = payload.cardData;
      return payload.stripe
        .createToken(cardNumber, cardExpiry, cardCvc, payload.additionalData)
        .then(res => {
          commit('updateToken', res.token);
          return res;
        })
        .catch(err => {
          throw err;
        });
    },
    fetchPaymentMethods({ commit }, { params }) {
      return new Promise((resolve, reject) => {
        PaymentMethodService.paymentmethods1(params)
          .then(res => {
            commit('updatePaymentMethods', res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addPaymentMethod({ commit }, { params }) {
      return new Promise((resolve, reject) => {
        PaymentMethodService.paymentmethods(params)
          .then(res => {
            commit('addPaymentMethod', res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    removePaymentMethod({ commit }, { params }) {
      return new Promise((resolve, reject) => {
        PaymentMethodService.paymentmethods2(params)
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
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
    },
    getPaymentMethods: state => {
      return state.paymentMethods;
    }
  }
};

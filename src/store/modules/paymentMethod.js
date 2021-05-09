import { PaymentMethodService } from '@whynotearth/meredith-axios';

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
    token: ''
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
    }
  },
  actions: {
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
    addPaymentMethod({ commit }, { params }) {
      return PaymentMethodService.paymentmethods(params);
    },
    updateCardElements({ commit }, payload) {
      commit('cardInfoUpdate', payload);
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    }
  }
};

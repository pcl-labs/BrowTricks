import { UserService } from '@whynotearth/meredith-axios';

const state = {
  users: []
};

const getters = {};

const actions = {
  fetchUsers({ commit }) {
    return UserService.users1()
      .then(response => {
        console.log(response);
        commit('SET_USERS', response.records);
      })
      .catch(() => {
        commit('SET_USERS', []);
      });
  }
};

const mutations = {
  SET_USERS(state, payload) {
    state.users = [...payload];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default {
  namespaced: true,
  state: {
    snackbar: {
      type: '',
      message: '',
      timeout: 2500
    },
    isVisible: false
  },
  actions: {
    setSnackbar({ commit }, payload) {
      commit('UPDATE_SNACKBAR', payload);
      commit('UPDATE_VISIBILITY', true);
    },
    toggleSnackbar({ commit }, payload) {
      commit('UPDATE_VISIBILITY', payload);
    }
  },
  mutations: {
    UPDATE_SNACKBAR(state, payload) {
      state.snackbar = payload;
    },
    UPDATE_VISIBILITY(state, payload) {
      state.isVisible = payload;
    }
  },
  getters: {
    snackbar: state => state.snackbar,
    isSnackbarVisible: state => state.isVisible,
    getTimeout: state => state.snackbar.timeout
  }
};

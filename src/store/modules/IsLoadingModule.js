function getInitialState() {
  return { isLoading: false };
}

export const isLoadingModule = {
  namespaced: true,
  state: getInitialState(),
  getters: {
    getIsLoadingStatus(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setIsLoadingToTrue(state) {
      state.isLoading = true;
    },
    setIsLoadingToFalse(state) {
      state.isLoading = false;
    },
  },
  actions: {
    setIsLoadingToTrue({ commit }) {
      commit("setIsLoadingToTrue");
    },
    setIsLoadingToFalse({ commit }) {
      commit("setIsLoadingToFalse");
    },
  },
};

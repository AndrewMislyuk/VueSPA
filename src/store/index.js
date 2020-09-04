import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import category from "./category";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, category },
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error: (state) => state.error,
  },
});

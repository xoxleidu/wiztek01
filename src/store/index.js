import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import cardTag from "./modules/cardTag";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    LOADING: false
  },
  getters: {
    loading: state => {
      return state.LOADING;
    }
  },
  mutations: {
    showLoading(state) {
      state.LOADING = true;
    },
    hideLoading(state) {
      state.LOADING = false;
    }
  },
  actions: {},
  modules: {
    user,
    cardTag
  }
});

export default store;

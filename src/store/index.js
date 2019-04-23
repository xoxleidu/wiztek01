import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import cardTag from "./modules/cardTag";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cardTag
  }
});

export default store;

import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import cart from "./cart";

const store = new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  modules: {
    auth,
    cart,
  },
});

export default store;

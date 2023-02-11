import axios from "axios";

export default {
  namespaced: true,
  state: {
    items: null,
    total: null,
    token: null,
  },

  getters: {
    getItems(state) {
      return state.items;
    },
    getTotal(state) {
      return state.total;
    },
    getToken(state) {
      return state.token;
    },
  },

  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    SET_TOTAL(state, data) {
      state.total = data;
    },
    SET_TOKEN(state, data) {
      state.token = data;
    },
  },

  actions: {
    async getItems({ dispatch }, id) {
      console.log("mnmnmnmn", id);
      await axios
        .get(`http://localhost:3000/api/shopping_cart/getItems/${id}`)
        .then((res) => {
          dispatch("attemptItems", res.data.data);
          return res.data.data;
        })
        .catch((err) => console.log(err));
    },

    async attemptItems({ commit }, items) {
      commit("SET_ITEMS", items);
    },

    async attemptTotak({ commit }, total) {
      commit("SET_TOTAL", total);
    },

    async attemptoken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
  },

  modules: {},
};

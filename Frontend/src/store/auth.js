import axios from "axios";

//Toast
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      if (state.token && state.user) {
        return true;
      } else {
        return false;
      }
    },
    user(state) {
      return state.user;
    },

    token(state) {
      return state.token;
    },
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
  },

  actions: {
    async signout({ commit }) {
      commit("SET_TOKEN", "");
      commit("SET_USER", "");
    },

    async signIn({ dispatch }, credentials) {
      await axios
        .post("http://localhost:3000/api/auth/login", credentials)
        .then((res) => {
          toast.success("Login correcto!");
          dispatch("attemptUser", res.data.data.user);
          return dispatch("attempt", res.data.data.token);
        })
        .catch((err) => {
          toast.error("Login incorrecto!");
          console.log(err);
        });
    },

    async register({ dispatch }, newUser) {
      await axios
        .post("http://localhost:3000/api/auth/register", newUser)
        .then((res) => {
          toast.success("Registrado correctamente!");

          dispatch("attemptUser", res.data.user);
          return dispatch("attempt", res.data.token);
        })
        .catch((err) => {
          toast.error("Login incorrecto!");
          console.log(err);
        });
    },

    async attemptUser({ commit }, user) {
      commit("SET_USER", user);
    },

    async attempt({ commit }, token) {
      commit("SET_TOKEN", token);
    },
  },

  modules: {},
};

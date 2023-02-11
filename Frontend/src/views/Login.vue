<template>
  <the-header class="shadow-sm"></the-header>

  <div class="container pt-5 pb-5">
    <!-- Contenedor -->
    <div class="row">
      <!-- Row -->

      <section class="vh-100">
        <div class="container py-5 h-100">
          <div
            class="row d-flex align-items-center justify-content-center h-100"
          >
            <div class="col-md-8 col-lg-5 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                class="img-fluid"
                alt="Phone image"
              />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1>Log In</h1>
              <br />
              <form @submit.prevent="getlogin">
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form1Example13"
                    >Correo Electrónico</label
                  >
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="pass"
                    v-model="form.password"
                    required
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form1Example23"
                    >Contraseña</label
                  >
                </div>

                <div
                  class="d-grid gap-2 gap-md-1 d-md-flex justify-content-lg-end"
                >
                  <button
                    type="submit"
                    @click="getlogin()"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Sign in
                  </button>
                  <router-link to="/register" style="text-decoration: none"
                    ><a class="btn btn-warning btn-lg btn-block"
                      >¿No tienes cuenta? Regístrate</a
                    ></router-link
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <!-- FIN LOG IN -->
    </div>
    <!-- Fin row -->
  </div>
  <!-- Fin Contenedor -->

  <the-footer class="shadow-sm"></the-footer>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { mapActions, mapGetters, mapState } from "vuex"; //Para poder llamar al metodo login de store
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    TheHeader,
    TheFooter,
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn",
      getItems: "cart/getItems",
      attemptoken: "cart/attemptoken",
    }),

    async getlogin() {
      await this.signIn(this.form).then(() => {
        if (this.authenticated) {
          this.$router.push("home");
        }
      });

      await this.attemptoken(this.token);
      await this.getItems(this.user._id);
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      token: "auth/token",
    }),
  },
};
</script>

<style scoped>
.log-in {
  padding: 30px;
  background-color: white;
  margin: 100px;
}

.loginCard {
  background-color: white;
}

.link a {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
}
.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-login {
  margin: auto;
  margin-top: 125px;
}
</style>

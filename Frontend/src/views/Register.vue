<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Registrarse</div>
        <form @submit.prevent="getRegister">
          <label for="name">Nombre</label>
          <div class="card-text">
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <label for="email">Email</label>
          <div class="card-text">
            <input type="email" id="email" v-model="form.email" required />
          </div>

          <label for="email">Edad</label>
          <div class="card-text">
            <input
              type="number"
              id="number"
              placeholder="minimo 16 años"
              min="16"
              max="100"
              v-model="form.age"
              required
            />
          </div>

          <label for="pass">Contraseña</label>
          <div class="card-text">
            <input type="password" id="pass" v-model="form.password" />
          </div>
          <button type="submit" class="btn btn-primary">Registrarse</button>
        </form>
        <div class="link">
          <router-link to="/login">¿Ya tienes una cuenta? Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        age: 0,
        name: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    async getRegister() {
      this.register(this.form).then(() => {
        if (this.authenticated) {
          this.$router.push("home");
        }
      });
    },
    makeToast() {
      this.$bvToast.toast("Usuario creado correctamente.", {
        title: "Registración",
        variant: "success",
        solid: true,
      });
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
}
.card-title {
  margin: 8px;
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
.link a,
.link {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
</style>

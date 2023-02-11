<template>
  <!-- Navbar -->

  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="javascript:void(0)"
        ><router-link to="/home">
          <div class="text">TEA House</div>
        </router-link></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mynavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/sobre-nosotros" class="router"
              ><a class="nav-link">Sobre Nosotros</a></router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">Categorías</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">Contacto</a>
          </li>
        </ul>

        <form class="d-flex right">
          <div>
            <input
              class="form-control me-2"
              type="text"
              placeholder="Buscar productos"
              v-model="search"
              v-on:input="searchProduct"
            />
          </div>
          <button class="btn btn-primary" type="button">
            <i class="material-icons search-icon" @click="searchProduct()">
              search
            </i>
          </button>
        </form>

        <div class="menu-emergente" style="display: flow-root">
          <ul>
            <li
              style="
                padding: 5px 10px;
                box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
              "
              v-for="item in ProductListSearch"
            >
              <router-link class="router" to=""
                ><span @click="productDetails(item._id)">
                  <img src="../assets/icons/green-tea.png" />
                  {{ item.name }} [{{ item.city }}]</span
                ></router-link
              >
            </li>
          </ul>
        </div>

        <div class="item">
          <div class="group">
            <i class="material-icons">account_circle</i>
            <div class="detail">
              <button class="action-btn" v-if="!authenticated" @click="login()">
                SIGN IN
              </button>

              <button class="action-btn" v-if="authenticated" @click="signOu()">
                SIGN OUT
              </button>
            </div>
          </div>
        </div>

        <div v-if="authenticated">
          <a class="item">
            <div class="group">
              <router-link to="/cart">
                <i class="material-icons">shopping_cart</i>
              </router-link>
              <div class="detail bg-dark" @change="getSizeItems()">
                {{ numItems.length }}
              </div>
            </div>

            <div class="group">
              <h6 class="text-white bg-dark">Bienvenido/a {{ user.name }}</h6>
            </div>
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- FIN Navbar -->
</template>

<style>
.router {
  text-decoration: none !important;
}
</style>

<script>
import { computed } from "@vue/runtime-core";
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      ProductList: [],
      ProductListSearch: [],
      search: "",
      numItems: 0,
    };
  },

  created() {
    this.getSizeItems();
  },

  methods: {
    ...mapActions({
      signout: "auth/signout",
    }),

    login() {
      this.$router.push("/login");
    },
    signOu() {
      this.signout();
    },

    productDetails(_id) {
      //Todo: refrech
      this.$router.push(`/details/${_id}`);
    },

    getSizeItems() {
      this.numItems = this.items;
    },

    async searchProduct() {
      if (this.search != "") {
        let url = `http://localhost:3000/api/products/search/${this.search}`;
        await axios
          .get(url)
          .then((res) => {
            this.ProductListSearch = res.data.data;
          })
          .catch((err) => console.log(err));
      } else {
        this.ProductListSearch = [];
      }
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      items: "cart/getItems",
    }),
  },
  watch: {
    data(newV, oldV) {
      console.log(oldV + "----->" + newV);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

* {
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
}

.text {
  color: white;
  text-decoration: none !important;
}

.item {
  padding: 10px;
  text-decoration: none;
  color: white;
  color: var(--theme-color);
}

.item.right {
  margin: 0 0 0 auto;
}

.navbar-dark .nav-item .nav-link {
  color: #fff;
}

.navbar-dark .nav-item .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  border-radius: 0.25rem;
  color: #fff;
}

.fa-li {
  position: relative;
  left: 0;
}
.navbar {
  background-color: #009688 !important;
}

.logo img {
  max-width: 40px;
}
.logo .text {
  text-decoration: none !important;
  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
}

.item {
  color: white;
}

.item.search {
  transition: 0.2s linear;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
.item.search .search-icon {
  border-left: 1px solid grey;
  margin: 2px;
  padding-left: 10px;
  cursor: pointer;
  color: grey;
}
.item.search .search-icon:hover {
  color: black;
}

.item.search input {
  width: 100%;
  padding: 6px;
  outline: none;
  border: 2px solid grey;
  max-width: 100%;
  border: 0;
}

.group {
  color: white;
}
.item .search-group {
  display: flex;
  width: 100%;
  max-width: 700px;
  border-radius: 20px;
  border: 2px solid grey;
  overflow: hidden;
  background: white;
  border-color: white;
  color: var(--theme-color);
}
.item .search-group select {
  border: 0;
  margin: 2px;
  border-right: 1px solid grey;
  max-width: 5em;
  outline: none;
  color: white;
}

.item .group {
  display: flex;
  align-items: center;
  font-size: 0.9em;
}

.item .group .sub {
  font-size: 0.8em;
}

.material-icons {
  font-size: 1.2rem;
}

.menu-icon {
  display: none;
}
.detail > button {
  color: white;
}

.action-btn {
  background-color: transparent;
  border: none;
}

.search {
  width: 50%;
}

.menu-emergente {
  position: absolute;
  top: 4em;
  background-color: white;
  padding: 0px !important;
  border: none;
  height: 0px;
  z-index: 1030;
  margin-left: auto;
  margin-right: auto;
  left: 10em;
  right: 10em;
}

.menu-emergente > ul {
  text-decoration: none;
  background-color: white;
  list-style: none;
  padding: 0px;
}

/** RESPONSIVE **/

@media (min-width: 576px) {
  .navbar-expand-sm .navbar-toggler {
    display: none !important;
  }
}

@media (max-width: 700px) {
  .item.search input {
    display: none;
  }
  .menu-icon {
    display: block;
  }
  .detail,
  .logo .text {
    display: none;
  }
  .navbar-toggler button {
    display: none !important;
  }

  .menu-emergente {
    left: 1em !important;
    right: 1em !important;
  }
}
</style>

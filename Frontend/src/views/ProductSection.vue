<style>
@import "../assets/css/product.css";
</style>

<template>
  <the-header class="shadow-sm"></the-header>

  <!-- Container -->
  <div class="container" style="height: 100vh">
    <!-- Row -->
    <div class="row py-3 pt-5">
      <div class="col-lg-4 details imgcol">
        <img
          class="mw-100"
          style="width: 100%"
          :src="details.image"
          alt="Card image cap"
        />
      </div>

      <div class="col-lg-8 details">
        <h3>{{ details.name }}</h3>
        <p class="text-success">{{ details.category }}</p>
        <br />
        <h6 class="tagname">Descripción</h6>
        <p style="text-align: justify">{{ details.description }}</p>
        <br />
        <div class="row">
          <div class="col">
            <h6 class="tagname">Precio</h6>
            <p>{{ details.price }} €</p>
          </div>
          <div class="col">
            <h6 class="tagname">Ciudad</h6>
            <p>{{ details.city }}</p>
          </div>
        </div>
        <br />
        <div class="d-grid gap-2 d-md-flex justify-content-md-left">
          <div v-if="authenticated">
            <button
              class="btn btn-primary btn-md"
              type="button"
              @click="addToCart(details.id)"
            >
              Añadir al Carrito<span class="material-symbols-outlined"
                >add_shopping_cart</span
              >
            </button>
          </div>
          <div v-if="authenticated">
            <button
              class="btn btn-warning btn-md"
              type="button"
              @click="productDetails(product._id)"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
      <!-- Fin Row -->
    </div>
    <!-- Fin Container -->

    <!-- CARROUSEL -->
    <div class="row">
      <div
        class="col-sm-2 col-md-4 col-lg-3"
        v-for="product in ProductList"
        :key="product.id"
      >
        <div
          class="card"
          v-if="
            product.category == details.category && product.name != details.name
          "
        >
          <p class="text-left position-absolute top-0 tag">
            {{ product.price }} $
          </p>
          <p class="text-left position-absolute top-50 end-0 city">
            {{ product.city }}
          </p>
          <img
            class="card-img-top card-image"
            :src="product.image"
            alt="Card image cap"
          />

          <div class="card-body">
            <p class="text-success">{{ product.category }}</p>
            <h5 class="card-title" @click="productDetails(product._id)">
              {{ product.name }}
            </h5>
            <p class="card-text">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- FIN CARROUSEL -->
  </div>
</template>

<script>
import axios from "axios";
import TheHeader from "../components/TheHeader.vue";
import Carousel from "../components/carousel.vue";
import { mapActions, mapGetters, mapState } from "vuex";
//Toast
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  components: {
    TheHeader,
    Carousel,
  },
  created() {
    this.getProductById();
    this.loadAllProducts();
  },

  data() {
    return {
      details: {},
      productCategory: {},
      price: 0.0,
      categoryList: [],
      ProductList: [],
      allProducts: [],
    };
  },
  methods: {
    async getProductById() {
      const id = this.$route.params.id;
      await axios
        .get(`http://localhost:3000/api/products/${id}`)
        .then((res) => {
          this.details = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    loadAllProducts() {
      fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((json) => {
          json.map(function (value, key) {});
          this.ProductList = json;
          this.allProducts = json;
        });
    },
    loadCategories() {
      fetch("http://localhost:3000/api/categorys")
        .then((res) => res.json())
        .then((json) => (this.categoryList = json));
    },

    async addToCart() {
      toast.info(`${this.details.name} se agrego al carrito!!`);

      const r_product = {
        id_user: this.user._id,
        id_product: this.details._id,
        name: this.details.name,
        image: this.details.image,
        price: this.details.price,
        quantity: 1,
        category: this.details.category,
      };
      const resp = await axios
        .post("http://localhost:3000/api/shopping_cart/createItem", r_product)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      console.log("....hola....", r_product);
      //this.$store.commit('cart/SET_ITEM',product)
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

<style>
.details {
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
  padding: 30px !important;
}
.tagname {
  color: #8e8e8f;
  font-weight: bolder;
}
.imgcol {
  text-align: center;
}
</style>

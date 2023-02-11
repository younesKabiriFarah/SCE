<style>
@import "../assets/css/home.css";
</style>

<template>
  <the-header class="shadow-sm"></the-header>

  <!-- Contents -->
  <div class="container d-md-flex align-items-stretch" style="height: 100vh">
    <div class="row py-3">
      <!-- Sidebar de Categorías -->
      <div class="col-sm-12 col-md-2">
        <div class="sticky-top pt-3">
          <div class="nav flex-column">
            <div class="section">
              <!-- Sección Precios -->
              <p class="sidebar-title">Precios</p>
              <input
                type="range"
                min="0"
                max="50"
                class="form-range"
                id="customRange1"
                v-model="price"
                v-on:input="loadAllProductsPrice"
              />
              {{ price }}$
            </div>
            <!-- Fin  Sección Precios -->

            <div class="section">
              <!-- Sección Categorías -->
              <p class="sidebar-title">Categorías</p>
              <div class="tagcloud">
                <a
                  class="tag-cloud-link"
                  v-for="item in categoryList"
                  :key="item"
                  @click="filteredItems(item)"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <!-- Fin Sección Categorías -->

            <div class="section">
              <!-- Sección Ciudades -->
              <p class="sidebar-title">Ciudades</p>
              <div class="tagcloud">
                <a
                  class="tag-cloud-link"
                  v-for="item in citylist"
                  :key="item"
                  @click="filteredItemsCity(item)"
                >
                  {{ item }}
                </a>
              </div>
            </div>
            <!-- Fin Sección Categorías -->
          </div>
        </div>
      </div>
      <!-- FIN Sidebar de Categorías -->

      <!-- Listado de Productos -->
      <div class="col-sm-12 col-md-10" id="main">
        <div class="row pt-3">
          <div
            class="col-sm-2 col-md-4 col-lg-3"
            v-for="product in ProductList"
            :key="product.id"
          >
            <div class="card">
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
                <div
                  class="d-grid gap-2 gap-md-1 d-md-flex justify-content-lg-end"
                >
                  <div v-if="authenticated">
                    <button
                      class="btn btn-primary btn-sm justify-content-center"
                      type="button"
                      @click="addToCart(product)"
                    >
                      Añadir<span class="material-symbols-outlined"
                        >add_shopping_cart</span
                      >
                    </button>
                  </div>

                  <button
                    class="btn btn-warning btn-sm"
                    type="button"
                    @click="productDetails(product._id)"
                  >
                    Detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin Listado de Productos -->
    </div>
    <!-- Fin Row -->
  </div>
  <!-- Fin Contents -->
</template>

<script>
import ItemCard from "../components/ItemCard.vue";
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";

//Toast
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  props: ["product"],
  components: {
    ItemCard,
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      price: 0.0,
      categoryList: [],
      citylist: [],
      ProductList: [],
      allProducts: [],
    };
  },
  created() {
    this.loadCategories();
    this.loadAllProducts();
    this.loadCities();
  },

  methods: {
    loadCategories() {
      fetch("http://localhost:3000/api/categorys")
        .then((res) => res.json())
        .then((json) => (this.categoryList = json));
    },
    loadCities() {
      fetch("http://localhost:3000/api/categorys/citys")
        .then((res) => res.json())
        .then((json) => {
          console.log(".-.-.>>>", (this.citylist = json));
        });
    },
    loadAllProducts() {
      fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((json) => {
          this.ProductList = json;
          this.allProducts = json;
        });
    },
    loadAllProductsPrice() {
      fetch(`http://localhost:3000/api/products/price/${this.price}`)
        .then((res) => res.json())
        .then((json) => {
          this.ProductList = json;
          this.allProducts = json;
        });
    },
    filteredItems(category) {
      const filteredItems = this.allProducts.filter((item) => {
        return item.category == category;
      });
      this.ProductList = filteredItems;
    },
    filteredItemsCity(city) {
      const filteredItems = this.allProducts.filter((item) => {
        return item.city == city;
      });
      this.ProductList = filteredItems;
    },
    productDetails(_id) {
      //Todo: refrech
      this.$router.push(`/details/${_id}`);
    },

    async addToCart(item) {
      toast.info(`${item.name} se agrego al carrito!!`);

      const r_product = {
        id_user: this.user._id,
        id_product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1,
        category: item.category,
      };

      const resp = await axios
        .post("http://localhost:3000/api/shopping_cart/createItem", r_product, {
          headers: {
            authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
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

<style>
body {
  background-color: #eeeeee !important;
}

.section {
  background-color: white;
  background-color: white;
  padding: 10px;
  margin: 10px;
  margin-left: 0px;
  margin-right: 0px;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.side {
  min-width: 250px;
}
.btn {
  font-size: 12px !important;
}
.card {
  margin: 10px 0px !important;
  height: 470px;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  border: none;
}
.card-title {
  max-block-size: initial;
  overflow: hidden;
  block-size: 45px;
  margin: 0px auto 5px auto !important;
}
.card-text {
  block-size: 49px;
  overflow: hidden;
  font-size: 11px !important;
  line-height: 12px;
  margin-bottom: 15px;
}
.card-image {
  height: 250px;
  padding: 0px !important;
}
.tag {
  background-color: #009688;
  color: white;
  padding: 2px 7px;
  margin: 5px;
  font-weight: bold;
  border-radius: 5px;
}
.city {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  background-color: black;
  margin-top: -5.5px;
  padding: 1px 8px;
  font-size: 13px;
  color: white;
}

.material-symbols-outlined {
  font-size: 15px;
  padding-top: 4px;
  padding-left: 4px;
}

.tagcloud a {
  text-transform: uppercase;
  display: inline-block;
  padding: 4px 10px;
  margin-bottom: 7px;
  margin-right: 4px;
  border-radius: 4px;
  color: #000;
  border: 1px solid #ccc;
  font-size: 11px;
  text-decoration: none;
}

.tagcloud a:hover {
  border-color: #009688;
  background: #009688;
  color: #fff;
  cursor: pointer;
}

/** HOVER **/

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px !important;
  border: 0px !important;
}

/** RESPONSIVE **/
@media (max-width: 700px) {
  .card {
    height: 520px;
  }
}
</style>

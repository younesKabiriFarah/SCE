<template>
  <the-header class="shadow-sm"></the-header>
  <div class="container">
    <span v-on:keydown="key">{{ message }}</span>
    <span class="d-flex mb-3 mt-2"></span>

    <div v-if="authenticated">
      <div class="card">
        <table class="table cart">
          <thead>
            <tr>
              <th scope="col" class="w-10">Product ID</th>
              <th scope="col" class="w-50">Item</th>
              <th scope="col" class="w-10">Quantity</th>
              <th scope="col" class="w-10">Price/item</th>
              <th scope="col" class="w-20"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in allItems" :key="product._id">
              <td>{{ product._id }}</td>
              <td class="d-flex">
                <img :src="product.image" />
                <span>{{ product.name }}</span>
              </td>
              <td>
                <input
                  type="number"
                  name=""
                  id=""
                  @change="onChange(product._id, $event)"
                  :value="product.quantity"
                  size="4"
                  min="1"
                  max="10"
                />
              </td>
              <td>
                <span>{{ parseFloat(product.price).toFixed(2) }}</span>
              </td>
              <td>
                <button class="btn btn-danger" @click="deleteItem(product._id)">
                  <span class="material-symbols-outlined">
                    delete_forever
                  </span>
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Monto:{{ itemsNum }}</td>
              <td>Total :{{ total }} €</td>
              <td>
                <button class="btn btn-success" @click="checkout">
                  Comprar Ahora
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>Debes Loguearte primero.</div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";

import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";

//Toast
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  components: {
    TheHeader,
  },
  created() {
    //this.allItems = this.cart;
    this.getCart();
  },
  data() {
    return {
      allItems: [],
      numProducts: 0,
      message: "",
    };
  },

  methods: {
    ...mapActions({
      attemptItems: "cart/attemptItems",
      getItems: "cart/getItems",
    }),
    //...mapMutations("cart", ["SET_QUANTITY"]),
    //...mapMutations("cart", ["DEL_ITEM"]),
    async getCart() {
      await this.getItems(this.user._id);
      this.allItems = this.items;
    },

    onChange(id, e) {
      this.total();
      this.allItems = this.items;
    },
    async deleteItem(id) {
      await axios
        .delete(`http://localhost:3000/api/shopping_cart/deleteItem/${id}`)
        .then((res) => {
          toast.warning("Producto borrado en el carrito correctamente!");
          return res.data;
        })
        .catch((err) => console.log(err));

      await this.getItems(this.user._id);
      this.allItems = this.items;
    },
    checkout() {},
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      items: "cart/getItems",
    }),

    itemsNum() {
      let sum = 0;
      if (this.allItems) {
        this.allItems.forEach((each) => {
          sum = sum + Number(each.quantity);
        });
      }

      return sum;
    },
    total() {
      let sum = 0;
      if (this.allItems) {
        this.allItems.forEach((each) => {
          sum = sum + each.price * each.quantity;
        });
      }
      return parseFloat(sum).toFixed(2);
    },
  },
};
</script>

<style scoped>
table {
  text-align: center;
}
.card {
  border: none;
}
.cart img {
  width: 70px;
  height: 70px;
}

.card-image {
  max-height: 200px;
  padding: 25px;
}
.card-text {
  font-size: 13px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  max-block-size: 20px;
  overflow: hidden;
}
.card-title:hover {
  text-decoration: underline;
  cursor: pointer;
}
button {
  display: flex !important;
  justify-content: center;
}
.card:hover {
  transform: translate(0, -1px);
}
.card-body {
  margin-top: 0px;
}
.desc {
  max-block-size: 40px;
  overflow: hidden;
}
.item2 {
  flex: 0 0 33%;
}

input {
  border: 1px solid grey;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 4px;
}
tr {
  vertical-align: middle;
}
.no-item {
  margin: auto;
  font-size: 45px;
  text-decoration: none;
}
</style>

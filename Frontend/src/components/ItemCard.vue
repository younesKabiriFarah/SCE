<template>
  <div class="card shadow-sm">
    <img
      class="card-img-top card-image"
      :src="product.image"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title" @click="productDetails(product._id)">
        {{ product.name }}
      </h5>
      <h5 class="card-title">{{ product.price }} €</h5>
      <p class="card-text desc">{{ product.description }}</p>
      <p class="card-text text-success">{{ product.category }}</p>
      <button
        class="btn btn-warning btn-text"
        type="button"
        @click="productDetails(product._id)"
      >
        Más
        <span class="material-symbols-outlined">read_more</span>
      </button>
      <div class="d-flex" style="justify-content: space-around">
        <button
          class="btn btn-success btn-text"
          type="button"
          @click="addToCart()"
        >
          Añadir!
          <span class="material-symbols-outlined">add_shopping_cart</span>
        </button>

        <button class="btn btn-primary" type="button">
          Comprar!
          <span class="material-symbols-outlined">shopping_bag</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//Toast
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  props: ["product"],

  created() {},
  data() {
    return {};
  },
  methods: {
    productDetails(_id) {
      //Todo: refrech
      this.$router.push(`/details/${_id}`);
    },
    addToCart() {
      toast.info(`${this.product.name} se agrego al carrito!!`);

      const product = {
        id: this.product.id,
        title: this.product.title,
        img: this.product.image,
        price: this.product.price,
      };
      //this.$store.commit('cart/SET_ITEM',product)
      //this.$store.dispatch('cart/updateCart').then(result => console.log("dispatched methosd"))
    },
  },
};
</script>

<style>
.card-image {
  max-height: 300px;
  padding: 5px;
}
.card-text {
  font-size: 13px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  max-block-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
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
  transform: translate(0, -5px);
  border: 1px solid black;
}
.card-body {
  margin-top: 0px;
}
.desc {
  max-block-size: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item2 {
  flex: 0 0 33%;
}
</style>

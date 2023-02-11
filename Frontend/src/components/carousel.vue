<template>
<br/><br/><br/>
  <carousel :items-to-show="1.5">
  
    <slide v-for="item in ProductList" :key="item">
        <!--<div class="item2" v-for="product in ProductList" :key="product.id">-->
            <item-card :product="item" style="width: 50%;"></item-card>
        <!--</div> -->
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  <button class="btn btn-warning btn-text" type="button" @click="loadAllProductsCategort()">More Items</button>

</template>

<style>
.carousel__slide{
    margin-right: -25em;
}
</style>


<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import axios from 'axios'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import ItemCard from "../components/ItemCard.vue"

export default {
    name: 'App',
    props: ['category'],
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        ItemCard,
    },
    data() {
        return {
            ProductList:[],
        }
    },
    created() {
    },
    methods:{
        async loadAllProductsCategort(){
            const categ = this.category
            await axios.get(`http://localhost:3000/api/products/caterory/${categ}`)
                .then(res =>{
                this.ProductList= res.data.data;
            })
            .catch(err => console.log(err)) 
            
        },
    }   
};
</script>
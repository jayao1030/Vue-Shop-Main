<template>
  <main role="main">
    <div class="album py-5 bg-light">
    <ProductCardModal />
      <div class="container">
        <h1 class="text-center p-5">{{ value }}</h1>
        <div class="row">
          <div
            class="col-md-4"
            v-for="product in getProducts"
            :key="product.id"
          >
            <div class="card product-item">
              <carousel :perPage="1">
                <slide v-for="(image, index) in product.images" :key="index">
                  <img
                    :src="image"
                    class="card-img-top p-1 img-logo"
                    alt="..."
                  />
                </slide>
              </carousel>

              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5
                    class="card-title"
                    style="cursor: pointer"
                    @click="showDetails(product)"
                  >
                    {{ product.name }}
                  </h5>
                  <h5 class="card-priceS">$ {{ product.price }}</h5>
                </div>
                <AddToCart :ProductId="product.id" value="加到購物車" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import $ from 'jquery';
import { Carousel, Slide } from 'vue-carousel';
import { db } from '../firebase/config';
import AddToCart from '../components/AddToCart.vue';
import ProductCardModal from '../components/ProductCardModal.vue';

export default {
  name: 'ProductsSlider',
  props: {
    value: {
      type: String,
      default: '我們的產品',
    },
    size: {
      default: 3,
    },
  },
  components: {
    AddToCart,
    Carousel,
    Slide,
    ProductCardModal,
  },
  firestore() {
    return {
      products: db.collection('products'),
    };
  },
  methods: {
    showDetails(product) {
      this.$store.dispatch('setActiveProduct', product);
      $('#productModal').modal('show');
    },
  },
  created() {
    console.log(this.products);
  },
  computed: {
    getProducts() {
      if (this.size > 0 && this.size < this.products.length) {
        return this.products.slice(0, this.size);
      }
      return this.products;
    },
  },
};
</script>

<style lang="scss" scoped>
  .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>

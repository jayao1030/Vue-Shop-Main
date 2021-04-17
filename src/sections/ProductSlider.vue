<template>
  <main role="main">
      <div class="container">
        <h3 class="news p-5">{{ value }}</h3>
        <div class="row">
          <ProductCardModal />
          <div
            class="col-lg-4 col-sm-6"
            v-for="product in getProducts"
            :key="product.id"
          >
            <div class="card product-card mb-3" data-aos="fade-up" data-aos-duration="800">
              <carousel :perPage="1"
              :paginationEnabled="false"
              :autoplay="true">
                <slide v-for="(image, index) in product.images" :key="index">
                  <img
                    :src="image"
                    class="card-img-top p-1 img-logo"
                    alt="image"
                     @click="showDetails(product)"
                     style="cursor:pointer;"
                  />
                </slide>
              </carousel>

              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5
                    class="card-title"
                  >
                    {{ product.name }}
                  </h5>
                  <h5 class="card-price">NT$ {{ product.price }}</h5>
                </div>
                <AddToCart :ProductId="product.id" value="加入購物車" />
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
      default: '最新商品',
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
    // console.log(this.products);
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
.news {
  font-weight:500;
  font-size: 2rem;
  letter-spacing: .5rem;
  text-align: center;
  position: relative;
}
  .card-title {
  font-weight:500;
  font-size: 1rem;
  letter-spacing: .1rem;
  text-align: center;
}
.card-price {
    font-size: .8rem;
    letter-spacing: .05rem;
    text-align: center;
}

</style>

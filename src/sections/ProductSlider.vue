<template>
  <main role="main">
    <div class="container">
      <h3 class="news p-5">{{ value }}</h3>
      <div class="row">
        <div
          class="col-lg-4 col-sm-6"
          v-for="product in getProducts"
          :key="product.id"
        >
          <div class="product-card card mb-5">
            <div class="show-info" @click="showDetails(product)">
              <img
                class="card-img"
                :src="product.images[0]"
                alt="Card image"
                style="cursor: pointer"
              />
              <span class="info">
                <p>商品詳情</p>
              </span>
            </div>
            <div class="card-body p-3">
              <div class="d-flex justify-content-between mb-3">
                <h3 class="card-title mb-1">
                  {{ product.name }}
                </h3>
                <div class="card-price">NT$ {{ product.price }} 元</div>
              </div>
              <AddToCart :ProductId="product.id" value="加入購物車" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductCardModal />
  </main>
</template>

<script>
import $ from 'jquery';
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
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  text-align: center;
  position: relative;
}
.card-title {
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  text-align: center;
}
.card-price {
  font-size: 0.8rem;
  letter-spacing: 0.05rem;
  text-align: center;
}

.VueCarousel-slide {
  visibility: visible;
  flex-basis: 100%;
  width: 100%;
}
</style>

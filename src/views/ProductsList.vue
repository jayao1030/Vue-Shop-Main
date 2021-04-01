<template>
  <div class="products-list">
    <Navbar />
    <div class="container mt-5">
      <div class="row w-100 h-60">
        <div class="col-md-7 mt-5">
          <h3>我們的產品</h3>
        </div>
      </div>
    </div>
    <div class="h-100">
      <ProductsSlider value="我們的產品" size="10" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ProductsSlider from '../sections/ProductSlider.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'ProductsList',
  components: {
    Footer,
    Navbar,
    ProductsSlider,
  },
};
</script>

<style scoped>
</style>

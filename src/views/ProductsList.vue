<template>
  <div class="products-list">
    <Navbar />
    <div class="container mt-5">
      <AllProducts />
      <!-- <ProductSlider/> -->
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import AllProducts from './AllProducts.vue';
// import ProductSlider from '../sections/ProductSlider.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'ProductsList',
  components: {
    Footer,
    Navbar,
    AllProducts,
    // ProductSlider,
  },
};
</script>

<style scoped>
</style>

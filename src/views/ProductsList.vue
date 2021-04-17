<template>
  <div class="products-list">
    <Navbar />
    <div class="container mt-5">
      <AllProducts />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import AllProducts from '../sections/AllProducts.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'ProductsList',
  components: {
    Footer,
    Navbar,
    AllProducts,
  },
};
</script>

<style scoped>
.products-list {
  margin-top: 5rem;
}
</style>

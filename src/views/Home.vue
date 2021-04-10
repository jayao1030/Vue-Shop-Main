<template>
<div>
    <Navbar />
    <Hero />
    <ProductSlider />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import Footer from '@/components/Footer.vue';
import ProductSlider from '@/sections/ProductSlider.vue';

export default {
  name: 'Home',
  components: {
    Hero,
    Navbar,
    ProductSlider,
    Footer,
  },
};
</script>

<style>
</style>

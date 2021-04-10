<template>
  <span style="cursor: pointer" @click="showCart"
    ><i class="fa fa-shopping-cart mt-2"></i>
    <span class="badge badge-pill badge-info" v-if="getCart.length > 0">{{
      getCart.length
    }}</span>
  </span>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  methods: {
    showCart() {
      $('#cartDropdown').dropdown('show');
    },
  },
  computed: {
    ...mapGetters(['getCart', 'totalPrice']),
  },
};
</script>

<style scoped>
</style>

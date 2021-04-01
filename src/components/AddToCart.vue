<template>
  <div class="addToCart">
    <button class="btn btn-sm btn-info p-2 mt-2" @click="addToCart">
      {{ value }}
    </button>
  </div>
</template>

<script>
import $ from 'jquery';
import { db } from '../firebase/config';

export default {
  name: 'AddToCart',
  props: {
    value: {
      type: String,
      required: true,
    },
    ProductId: {
      type: String,
      required: true,
    },
  },
  firestore() {
    return {
      product: db.collection('products').doc(this.ProductId),
    };
  },

  methods: {
    addToCart() {
      $('#cartModal').modal('show');
      this.$store.dispatch('addProduct', this.product);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

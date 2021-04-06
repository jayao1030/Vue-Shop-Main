<template>
  <div v-if="!buttonLarge" class="d-flex">
    <button v-if="isAlreadyAdded()" class="btn btn-success btn-sm">
      <i class="fa fa-check" aria-hidden="true"></i> 已加入購物車
    </button>
    <button v-else class="btn btn-primary btn-sm" @click="addToCart()">
      {{ value }}
    </button>
  </div>
  <div v-else>
    <button
      v-if="isAlreadyAdded()"
      class="btn btn-success px-5"
      style="height: 100%"
    >
      <i class="fa fa-check" aria-hidden="true"></i> 已加入購物車
    </button>
    <button
      v-else
      @click="addToCart()"
      class="btn btn-info px-5"
      style="height: 100%"
    >
      {{ value }}
    </button>
  </div>
</template>

<script>
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
    buttonLarge: {
      type: Boolean,
      default: false,
    },
  },
  firestore() {
    return {
      product: db.collection('products').doc(this.ProductId),
    };
  },

  methods: {
    addToCart() {
      this.$store.dispatch('addProduct', this.product);
    },
    isAlreadyAdded() {
      const found = this.$store.state.cart.find((item) => item.id === this.product.id);
      if (found) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>

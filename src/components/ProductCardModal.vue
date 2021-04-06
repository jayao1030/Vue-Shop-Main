<template>
  <div class="card-modal">
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header modalHeader border-0">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="productModal_img col-md-6">
                <img :src="product.images" alt="image" width="100%" />
              </div>
              <div class="col-md-6">
                <h6>{{ product.category }}</h6>
                <h5>{{ product.name }}</h5>
                <h6 class="text-info">${{ product.price }}</h6>
                <p v-html="product.description"></p>
                <div v-if="!buttonLarge" class="d-flex">
    <button v-if="isAlreadyAdded()" class="btn btn-success btn-sm">
      <i class="fa fa-check" aria-hidden="true"></i> 已加入購物車
    </button>
    <button v-else class="btn btn-primary btn-sm" @click="addToCart()">
      加入購物車
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
      加入購物車
    </button>
  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '../firebase/config';

export default {
  name: 'ProductCardModal',
  props: {
    buttonLarge: {
      type: Boolean,
      default: false,
    },
  },
  firestore() {
    return {
      products: db.collection('products'),
    };
  },
  computed: {
    ...mapGetters({
      product: 'getActiveProduct',
    }),
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

<style scoped>
</style>

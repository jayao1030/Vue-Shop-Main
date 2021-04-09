<template>
  <div class="container w-100 h-100">
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">購物車</h5>
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
            <div v-if="getCart.length === 0">您的購物車是空的</div>
            <div
              class="card mt-2 customCard"
              style="width: 40vw"
              v-for="product in getCart"
              :key="product.id"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-md-3">
                    <img :src="product.images[0]" alt="" width="100px" />
                  </div>
                  <div class="col-md-9">
                    <button
                      type="button"
                      class="close"
                      aria-label="Close"
                      @click="deleteProduct(product)"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 class="card-title">{{ product.name }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      ${{ product.price }}
                    </h6>
                    <p class="card-text">
                      數量:
                      <span
                        style="cursor: pointer"
                        class="add-item"
                        @click="decreaseProduct(product)"
                        >-</span
                      >
                      {{ product.quantity }}
                      <span
                        style="cursor: pointer"
                        class="add-item"
                        @click="addProduct(product)"
                        >+</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="setCartEmpty()"
              >
                清空購物車
              </button>

              <h6>總共金額: ${{ totalPrice }}</h6>
              <button
                @click="goToCheckout"
                type="button"
                class="btn btn-primary"
              >
                結帳
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import { auth } from '../firebase/config';

export default {
  name: 'CartModal',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    ...mapActions([
      'deleteProduct',
      'addProduct',
      'decreaseProduct',
      'setCartEmpty',
    ]),
    showCart() {
      $('#cartModal').modal('show');
    },
    goToCheckout() {
      $('#cartModal').modal('hide');
      this.$router.push({ name: 'Checkout' });
    },
  },
  computed: {
    ...mapGetters(['getCart', 'totalPrice']),
  },
  created() {
    this.user = auth.currentUser;
  },
};
</script>

<style scoped>
.customCard {
  transition: transform 0.2s ease;
  max-width: 450px;
}

.customCard:hover {
  transform: scale(1.01);
}

.add-item {
  cursor: pointer;
  font-weight: bold;
}
</style>

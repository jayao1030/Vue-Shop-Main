<template>
  <div class="container w-100 h-100">
    <div class="dropdown-body">
      <h6 class="dropdown-title">購物車</h6>
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
                @click.stop="deleteProduct(product)"
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
                  @click.stop="decreaseProduct(product)"
                  >-</span
                >
                {{ product.quantity }}
                <span
                  style="cursor: pointer"
                  class="add-item"
                  @click.stop="addProduct(product)"
                  >+</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="dropdown-footer d-flex justify-content-between align-items-center mt-3"
    >
      <button
        type="button"
        class="btn btn-outline-danger btn-sm"
        @click.stop="setCartEmpty()"
      >
        清空購物車
      </button>

      <h6>金額合計: ${{ totalPrice }}</h6>
      <button @click.stop="goToCheckout" type="button" class="btn btn-primary">
        結帳
      </button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import { auth } from '../firebase/config';

export default {
  name: 'CartDropdown',
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
    goToCheckout() {
      $('#cartDropdown').dropdown('hide');
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

<style>

.customCard {
  transition: transform 0.2s ease;
  max-width: 450px;
  border-radius: 0;
}

.customCard:hover {
  transform: scale(1.01);
}

.add-item {
  cursor: pointer;
  font-weight: bold;
}

</style>

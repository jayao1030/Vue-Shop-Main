<template>
  <div class="container w-100 h-100">
    <div class="dropdown-body">
      <h6 class="dropdown-title">購物車</h6>
      <div v-if="getCart.length === 0">您的購物車是空的</div>
      <div
        class="card mt-2 customCard"
        style="width: 100vw"
        v-for="product in getCart"
        :key="product.id"
      >
        <div class="card-body">
          <div class="row">
            <div class="item">
              <img :src="product.images[0]" alt="image" class="imgs" width="100" />
            </div>
            <div class="flex-2 item">
              <h5 class="card-title mb-3 text-center">{{ product.name }}</h5>
              <h6 class="card-subtitle mb-3 text-muted text-center">
                NT${{ product.price }}
              </h6>
              <p class="card-text text-center">
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
            <div class="item">
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click.stop="deleteProduct(product)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="dropdown-footer d-flex justify-content-between align-items-center mt-3 w-100"
      v-if="getCart.length"
    >
      <button
        type="button"
        class="btn btn-clear"
        @click.stop="setCartEmpty()"
      >
        清空購物車
      </button>

      <h6>合計: NT${{ totalPrice }}</h6>
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

<style lang="scss" scoped>
.customCard {
    max-width:400px;
    .row {
      display: flex;
      .item {
        flex: 1;
      .card-title {
        font-size: 18px;
      }
      }
      .flex-2  {
        flex-grow: 5;
        font-size: 20px;
      }
    }
  }

@media screen and (max-width:768px) {
  .customCard {
    max-width: 320px;
    .row {
      display: flex;
      flex-wrap: nowrap;
      .item {
        flex: 1;
      .card-title {
        font-size: 18px;
      }
      .close {
        font-size: 14px;
      }
      }
      .flex-2  {
        flex-grow: 7;
        font-size: 16px;
      }
    }
  }
}
</style>

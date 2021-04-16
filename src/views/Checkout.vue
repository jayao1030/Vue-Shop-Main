<template>
  <div class="checkout">
    <Navbar />
    <div class="container content">
      <ProductCardModal />
      <div class="row">
        <div class="col-md-6 mt-3">
          <h4 class="mb-5">購買清單</h4>
          <div v-if="getCart.length === 0">您的購物車是空的</div>
          <div
            class="card mt-2 customCard scrollable-menu"
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
            <!-- <div class="card-body">
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="deleteProduct(product)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="row col">
                <div class="col-md-5">
                  <img :src="product.images[0]" alt="" width="100px" />
                </div>
                <div class="col-md-7">
                  <h5
                    class="card-title mb-3"
                    style="cursor: pointer"
                    @click="showDetails(product)"
                  >
                    {{ product.name }}
                  </h5>
                  <h6 class="card-subtitle mb-3 text-muted">
                    $ {{ product.price }}
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
            </div> -->
          </div>
        </div>
        <div class="col-md-6 mt-3 p-5">
          <div class="row mt-2" v-if="getCart.length">
            <h6 class="text-secondary" v-if="!user">
              要完成購物，您必須先
              <a
                class="text-primary"
                style="cursor: pointer"
                data-toggle="modal"
                data-target="#login"
                >登入</a
              >
            </h6>
            <div v-if="user" class="w-100">
              <h4>交易資訊</h4>
              <p class="text-secondary">填寫您的交易資訊</p>
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="updateProfile">
                  <div class="form-row">
                    <div class="col-md-6 mb-5">
                      <validation-provider
                        rules="required|email"
                        v-slot="{ errors, classes }"
                      >
                        <label for="email">Email</label>
                        <input
                          name="信箱"
                          type="email"
                          class="form-control"
                          id="email"
                          v-model="profile.email"
                          :class="classes"
                          placeholder="請輸入Email"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors, classes }"
                      >
                        <label for="name">姓名</label>
                        <input
                          name="姓名"
                          type="text"
                          class="form-control"
                          v-model="profile.name"
                          id="name"
                          :class="classes"
                          placeholder="請輸入姓名"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <validation-provider
                    rules="required|min:10"
                    v-slot="{ errors, classes }"
                  >
                    <div class="form-group">
                      <label for="telphone">電話號碼</label>
                      <input
                        name="電話號碼"
                        type="tel"
                        class="form-control"
                        id="telphone"
                        v-model="profile.phone"
                        :class="classes"
                        placeholder="請輸入電話"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <div class="form-group">
                      <label for="address">地址</label>
                      <input
                        name="地址"
                        type="address"
                        class="form-control"
                        v-model="profile.address"
                        id="address"
                        :class="classes"
                        placeholder="請輸入地址"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>

                  <h6 class="text-dark mt-3 mb-5">
                    金額合計 : NT$ {{ totalPrice }}
                  </h6>
                  <input
                    :disabled="invalid"
                    class="btn btn-primary"
                    type="submit"
                    value="確認訂單"
                  />
                  <router-link
                    class="btn btn-outline-info ml-2"
                    :to="{ name: 'ProductsList' }"
                    >繼續購物</router-link
                  >
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
        <hr class="col-xs-12 mt-3" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';
import Navbar from '../components/Navbar.vue';
import { db, auth } from '../firebase/config';
import ProductCardModal from '../components/ProductCardModal.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Checkout',
  components: {
    Footer,
    ProductCardModal,
    Navbar,
  },
  data() {
    return {
      user: null,
      loading: false,
    };
  },
  firestore() {
    const user = auth.currentUser;
    return {
      profile: db.collection('profiles').doc(user.uid),
    };
  },
  methods: {
    ...mapActions(['deleteProduct', 'addProduct', 'decreaseProduct']),

    showDetails(product) {
      this.$store.dispatch('setActiveProduct', product);
      $('#productModal').modal('show');
    },

    updateProfile() {
      this.loading = true;

      this.$firestore.profile
        .update(this.profile)
        .then(() => {
          this.loading = false;
          window.Toast.fire({
            icon: 'success',
            title: '訂單建立成功!',
          });
          this.$router.push({ name: 'Payment' });
        })
        .catch((err) => console.log(err));
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
  .scrollable-menu {
  height: auto;
  max-height: 480px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #1accb4;
  }
  }
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

<template>
  <div class="checkout">
    <Navbar />
    <div class="container content">
      <ProductCardModal />
      <div class="row">
        <div class="col-md-6 mt-3 ">
          <h4 class="mb-5">購買清單</h4>
          <div v-if="getCart.length === 0">您的購物車是空的</div>
          <div
            class="card mt-2 customCard"
            style="width: 40vw"
            v-for="product in getCart"
            :key="product.id"
          >
            <div class="card-body">
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="deleteProduct(product)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="row col"  @click="showDetails(product)">
                <div class="col-md-5">
                  <img
                    :src="product.images[0]"
                    alt=""
                    width="100px"
                  />
                </div>
                <div class="col-md-7 ">
                  <h5
                    class="card-title"
                    style="cursor: pointer"
                  >
                    {{ product.name }}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
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
            </div>
          </div>
        </div>
        <div class="col-md-6 mt-3">
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

          <form @submit.prevent="updateProfile">
              <div class="w-100 mb-3">
                <label for="validationDefault01">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="profile.name"
                  id="validationDefault01"
                  value="Mark"
                  required
                />
              </div>
                <div class="w-100 mb-3">
                <label for="validationDefaultUsername">手機號碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationDefaultUsername"
                    v-model="profile.phone"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
              <div class="w-100 mb-3">
                <label for="validationDefault03">地址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="profile.address"
                  id="validationDefault03"
                  required
                />
              </div>
            <hr class="col-xs-12 mt-3" />
            <h6 class="text-danger mt-3 mb-5">金額合計 : NT$ {{ totalPrice }}</h6>
            <input
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

<style>
</style>

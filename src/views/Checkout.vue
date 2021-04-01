<template>
  <div class="checkout">
    <Navbar />
    <div class="container mt-5">
      <ProductCardModal />
      <div class="row">
        <div class="col-md-6">
          <h4>結帳頁面</h4>
          <h5 class="mb-4 text-secondary">總共金額: ${{ totalPrice }}</h5>

          <div v-if="getCart.length == 0">您的購物車是空的</div>
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
              <div class="row">
                <div class="col-md-3">
                  <img
                    :src="product.images[0]"
                    alt=""
                    width="100px"
                    @click="showDetails(product)"
                  />
                </div>
                <div class="col-md-9">
                  <h5
                    class="card-title"
                    @click="showDetails(product)"
                    style="cursor: pointer"
                  >
                    {{ product.name }}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    ${{ product.price }}
                  </h6>
                  <p class="card-text">
                    Quantity:
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
        <div class="col-md-6 mt-5">
        </div>
      </div>
      <hr class="col-xs-12 mt-3" />
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
          <p class="text-secondary">檢查您的交易資訊</p>

          <form @submit="updateProfile">
            <div class="form-row">
              <div class="col-md-4 mb-3">
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
              <div class="col-md-4 mb-3">
                <label for="validationDefaultUsername">手機號碼</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2"
                      ></span
                    >
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="validationDefaultUsername"
                    v-model="profile.phone"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-5 mb-3">
                <label for="validationDefault03">地址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="profile.address"
                  id="validationDefault03"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="agree"
                  id="invalidCheck2"
                  required
                />
                <label class="form-check-label" for="invalidCheck2">
                  請勾選同意條款和條件
                </label>
              </div>
            </div>
            <hr class="col-xs-12 mt-2" />
            <h6 class="text-info mt-3">總共金額: ${{ totalPrice }}</h6>
            <p class="text-secondary">請確認您的地址是正確的</p>
            <input
              class="btn btn-primary"
              type="submit"
              value="前往付款"
            />
            <router-link
              class="btn btn-outline-info ml-2"
              :to="{ name: 'ProductsList' }"
              >繼續購物</router-link
            >
            <hr class="col-xs-12 mt-5" />
          </form>
        </div>
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
  data() {
    return {
      user: null,
      loading: null,
      agree: null,
    };
  },
  firestore() {
    const user = auth.currentUser;
    return {
      profile: db.collection('profiles').doc(user.uid),
    };
  },
  components: {
    Footer,
    ProductCardModal,
    Navbar,
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
            title: 'Your delivery address was saved!',
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

<style scoped>
.customCard {
  transition: transform 0.2s ease;
  max-width: 450px;
}

.customCard:hover {
  transform: scale(1.03);
}
</style>

<template>
  <div class="overview content">
    <Navbar />
    <Loading v-if="loading" />
    <div class="container h-100 mt-5">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>訂單確認</h3>
            <p class="text-dark">
                已經收到您的訂單，待付款後，將盡快幫您出貨!
            </p>
            <h6 class="text-info">總共金額: NT${{ totalPrice }}</h6>
          </div>
        </div>
      </div>

      <hr class="col-xs-12 mt-4" />

      <div class="row h-100 mt-3">

        <div class="col-md-4 mt-2">
          <button
            class="btn btn-outline-info"
            v-if="cart.length"
            @click="addOrder"
          >
            查看訂單
          </button>
            <!-- 未完成  -->
          <button class="btn btn-outline-danger ml-2">付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '../components/Navbar.vue';
import { db, auth } from '../firebase/config';
import Loading from '../components/Loading.vue';

export default {
  name: 'Overview',
  components: { Loading, Navbar },
  data() {
    return {
      loading: null,
    };
  },
  computed: {
    ...mapGetters({
      totalPrice: 'totalPrice',
      cart: 'getCart',
    }),
  },
  firestore() {
    const user = auth.currentUser;
    return {
      orders: db.collection('orders'),
      profile: db.collection('profiles').doc(user.uid),
    };
  },
  methods: {
    ...mapActions(['setCartEmpty']),

    addOrder() {
      const order = {
        user: this.profile,
        order: this.cart,
        status: '等待付款',
      };
      console.log(order);
      this.loading = true;
      this.$firestore.orders
        .add(order)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: 'Overview' });
        })
        .catch((err) => {
          console.error(err);
          window.Toast.fire({
            icon: 'error',
            title: 'Your order has been rejected!',
          });
        });
      this.$store.dispatch('setCartEmpty');
    },
  },
};
</script>

<style scoped>
</style>

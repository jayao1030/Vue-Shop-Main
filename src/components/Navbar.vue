<template>
  <header
    class="site-header fixed-top py-1"
    :class="{ change_bg: scrollPosition > 40 }"
  >
    <Login />
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-4 d-flex jsutify-content-start mt-1">
          <router-link :to="{ name: 'ProductsList' }" class="nav-link" href="#">
            Products
          </router-link>
          <router-link :to="{ name: 'About' }" class="nav-link" href="#">
            About
          </router-link>
        </div>
        <div class="col-4 text-center mt-1">
          <router-link class="navbar-brand" :to="{ name: 'Home' }">
            <img src="/img/logo_transparent.png" alt="logo" width="100"
          /></router-link>
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center mt-1">
          <div class="nav-item dropdown" v-if="user">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="far fa-user"></i>
            </a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" :to="{ name: 'UserProfile' }"
                >帳戶</router-link
              >
              <router-link class="dropdown-item" :to="{ name: 'Overview' }"
                >我的訂單</router-link
              >
              <router-link class="dropdown-item" :to="{ name: 'Checkout' }"
                >結帳</router-link
              >
              <div class="dropdown-divider"></div>
              <a @click="logout" class="dropdown-item" style="cursor: pointer"
                >登出</a
              >
            </div>
          </div>
          <div v-if="!user" class="nav-item">
            <a
              class="nav-link"
              style="cursor: pointer"
              data-toggle="modal"
              data-target="#login"
            >
              登入
            </a>
          </div>
          <div class="nav-item dropdown dropdown-cart mr-3">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="/img/svg/shopping_cart_black_18dp.svg" alt="cart">
              <span v-if="getCart.length > 0"> ({{ getCart.length }})</span>
            </a>
            <div class="dropdown-menu">
              <CartDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '@/firebase/config';
import Login from './Login.vue';
import CartDropdown from './CartDropdown.vue';

export default {
  name: 'Navbar',
  components: {
    Login,
    CartDropdown,
  },
  data() {
    return {
      user: null,
      scrollPosition: null,
    };
  },
  created() {
    this.user = auth.currentUser;
  },
  computed: {
    ...mapGetters(['getCart', 'totalPrice']),
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => console.log(err));
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
};
</script>

<style>
.change_bg {
  background-color: white;
  border-bottom: 1px solid #000;
  transition: background-color 0.2s ease-in-out;
}
.dropdown-cart .dropdown-toggle::after {
  display: none;
}
.dropdown-menu {
  border: 1px solid #000;
  border-radius: 0;
  margin-top: 17px;
}
</style>

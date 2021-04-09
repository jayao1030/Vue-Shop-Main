<template>
  <header>
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-4 d-flex jsutify-content-start mt-1">
            <router-link
              :to="{ name: 'ProductsList' }"
              class="nav-link"
              href="#"
            >
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
            <div class="nav-item dropdown mr-5" v-if="user">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-user"></i>
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
            <div class="nav-item mr-1">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    <Login />
    <CartModal />
  </header>
</template>

<script>
import { auth } from '@/firebase/config';
import Login from './Login.vue';
import Cart from './Cart.vue';
import CartModal from './CartModal.vue';

export default {
  name: 'Navbar',
  components: {
    Login,
    Cart,
    CartModal,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = auth.currentUser;
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
  },
};
</script>

<style>
</style>

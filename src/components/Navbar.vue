<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-white bg-white border-bottom shadow-sm fixed-top">
      <div class="container-fluid d-flex flex-column flex-md-row align-items-center">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">Vue Shop</router-link>
        <button class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link
              :to="{name: 'Home'}"
              class="nav-link"
              href="#">
                Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{name: 'ProductsList'}"
              class="nav-link"
              href="#"
              >
                Products
              </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'About'}"
              class="nav-link"
              href="#"
              >
                About
              </router-link>
          </li>

        </ul>

        <ul class="navbar-nav mr-2">
          <li class="nav-item dropdown" v-if="user">
            <a class="nav-link dropdown-toggle"
              data-toggle="dropdown" href="#"
              role="button" aria-haspopup="true"
              aria-expanded="false"
              >
                <i class="fas fa-user"></i>
              </a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" :to="{ name: 'UserProfile' }">帳戶</router-link>
              <router-link class="dropdown-item" :to="{ name: 'Overview' }">我的訂單</router-link>
              <router-link class="dropdown-item"
              :to="{ name: 'Checkout' }">結帳</router-link>
              <div class="dropdown-divider"></div>
              <a @click="logout" class="dropdown-item" style="cursor: pointer;">登出</a>
            </div>
          </li>
          <li v-if="!user" class="nav-item">
            <a class="nav-link"
              style="cursor: pointer;"
              data-toggle="modal"
              data-target="#login"
              >
                登入
              </a>
          </li>
          <li class="nav-item mr-5 mt-1">
            <div class="container"><Cart /></div>
          </li>
        </ul>
      </div>
      </div>
    </nav>
        <Login />
        <CartButton />
  </header>
</template>

<script>
import { auth } from '@/firebase/config';
import Login from './Login.vue';
import Cart from './Cart.vue';
import CartButton from './CartButton.vue';

export default {
  name: 'Navbar',
  components: {
    Login, Cart, CartButton,
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
      auth.signOut()
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

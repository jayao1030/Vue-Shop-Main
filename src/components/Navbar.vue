<template>
  <header>
    <nav
      class="site-header fixed-top py-1"
      :class="{ change_bg: scrollPosition > 40 }"
    >
      <div class="container">
        <div class="row navbar justify-content-between align-items-center">
          <div class="col-4 d-flex mt-1 nav-item-left">
            <router-link
              :to="{ name: 'ProductsList' }"
              class="nav-link"
            >
              <span class="nav-link-left">所有商品</span>
            </router-link>
            <router-link :to="{ name: 'About' }" class="nav-link">
              <span class="nav-link-left">關於我們</span>
            </router-link>
          </div>
          <div class="col-4 text-center mt-1 nav-item-logo">
            <router-link class="navbar-brand" :to="{ name: 'Home' }">
              <img src="/img/logo_transparent.png" alt="logo" width="100"
            /></router-link>
          </div>
          <div
            class="col-4 d-flex justify-content-end align-items-center mt-1"
          >
            <div class="nav-item dropdown" v-if="user">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="far fa-user nav-link-right"></i>
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
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                data-offset="30,30"
              >
                <img
                  class="nav-link-right"
                  src="/img/svg/shopping_cart_black_18dp.svg"
                  alt="cart"
                />
                <span v-if="getCart.length > 0"> ({{ getCart.length }})</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right scrollable-menu">
                <CartDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 手機尺寸導航 -->
    <nav class="phone-header fixed-top py-1 navbar-light">
      <div class="container">
        <div class="row d-flex ">
            <router-link class="navbar-brand" :to="{ name: 'Home' }">
              <img src="/img/logo_transparent.png" alt="logo" width="85"
            /></router-link>
             <div class="nav-item dropdown" v-if="user">
                <a
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="far fa-user nav-link-right"></i>
                </a>
                <div class="dropdown-menu">
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'UserProfile' }"
                    >帳戶</router-link
                  >
                  <router-link class="dropdown-item" :to="{ name: 'Overview' }"
                    >我的訂單</router-link
                  >
                  <router-link class="dropdown-item" :to="{ name: 'Checkout' }"
                    >結帳</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <a
                    @click="logout"
                    class="dropdown-item"
                    style="cursor: pointer"
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
              <div class="nav-item dropdown dropdown-cart">
                <a
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    class="nav-link-right"
                    src="/img/svg/shopping_cart_black_18dp.svg"
                    alt="cart"
                  />
                  <span v-if="getCart.length > 0"> ({{ getCart.length }})</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right scrollable-menu">
                  <CartDropdown />
                </div>
              </div>
              <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <div class="nav-item nav-item-small">
              <router-link
                :to="{ name: 'ProductsList' }"
                class="nav-link"
                href="#"
              >
                <span class="nav-link-left">所有商品</span>
              </router-link>
              <router-link :to="{ name: 'About' }" class="nav-link" href="#">
                <span class="nav-link-left">關於我們</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
        <Login />
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

<style lang="scss" scoped>
.phone-header {
  display: none;
}
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
  margin-top: 25px;
}
span.nav-link-left {
  &:hover {
    border-bottom: 2px solid #ff7566;
  }
}
.nav-link-right {
  &:hover {
    transform: scale(1.1);
  }
}
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

@media screen and (max-width:768px) {
  .site-header {
    display: none;
  }
  .phone-header {
    display: block;
    background: white;
    border-bottom: 1px solid #000;
    .row {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .nav-item-small {
        display: flex;
        justify-content: center;
      }
      .dropdown-menu {
        margin-top: 13px;
        max-width:360px;
      }
    }
  }
}
@media screen and (max-width:375px) {
  .site-header {
    display: none;
  }
  .phone-header {
    display: block;
    background: white;
    border-bottom: 1px solid #000;
    .row {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .nav-item-small {
        display: flex;
        justify-content: center;
      }
      .dropdown-menu {
        margin-top: 13px;
        max-width:360px;
      }
    }
  }
}
</style>

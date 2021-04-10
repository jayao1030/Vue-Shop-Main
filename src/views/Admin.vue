<template>
  <div class="admin">
    <div class="page-wrapper light-theme  sidebar-bg bg1 toggled">
      <a
        id="show-sidebar"
        @click="closeMenu"
        class="btn btn-sm btn-dark"
        href="#"
      >
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <router-link :to="{ name : 'Home'}"><i class="fas fa-home"></i></router-link>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header d-flex flex-nowrap">
            <div class="user-pic">
              <img
                v-if="getUser.photoURL"
                :src="getUser.photoURL"
                style="border-radius: 50%"
                alt="userPhoto"
                width="100px">
              <img
                v-else
                class="img-responsive img-rounded"
                src="/img/svg/user-regular.svg"
                alt="User picture"
                width="100px"
              />
            </div>
            <div class="user-info">
              <span class="user-name">
                <strong>{{ profile.name }}</strong>
              </span>
               <span class="user-name" v-if="getUser.displayName">
                @{{ getUser.displayName }}
              </span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>
              <li>
                <router-link :to="{ name: 'Overview'}">
                  <i class="fa fa-tachometer-alt"></i>
                  <span>我的訂單</span>
                </router-link>
              </li>
               <li>
                <router-link :to="{ name: 'UserProfile'}">
                  <i class="fa fa-user"></i>
                  <span>用戶資訊</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Products'}">
                  <i class="fas fa-box"></i>
                  <span>產品</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Orders'}">
                  <i class="far fa-list-alt"></i>
                  <span>訂單</span>
                </router-link>
              </li>
              <li>
                <a href="#" @click="logout">
                  <i class="fa fa-power-off"></i>
                  <span>登出</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content pr-2">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/firebase/config';
import $ from 'jquery';

export default {
  name: 'Admin',
  firestore() {
    const user = auth.currentUser;
    return {
      profile: db.collection('profiles').doc(user.uid),
    };
  },
  methods: {
    closeMenu() {
      $('.page-wrapper').toggleClass('toggled');
    },
    logout() {
      auth.signOut()
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    getUser() {
      return auth.currentUser;
    },
  },
};
</script>

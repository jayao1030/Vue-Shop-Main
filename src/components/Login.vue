<template>
    <div class="login">
      <div
        class="modal fade"
        id="login"
        tabindex="-1"
        role="dialog"
        aria-labelledby="loginTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul
                class="nav nav-fill nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-login"
                    role="tab"
                    aria-controls="pills-login"
                    aria-selected="true"
                    >登入</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-register-tab"
                    data-toggle="pill"
                    href="#pills-register"
                    role="tab"
                    aria-controls="pills-register"
                    aria-selected="false"
                    >註冊</a
                  >
                </li>
              </ul>

              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="pills-login-tab"
                >
                  <h5 class="text-center">請先登入</h5>
                  <div class="form-group">
                    <label for="exampleInputEmail1">信箱</label>
                    <input
                      type="email"
                      v-model="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">密碼</label>
                    <input
                      type="password"
                      @keyup.enter="login"
                      v-model="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>

                  <div class="form-group">
                    <button class="btn btn-info" @click="login">登入</button>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-register"
                  role="tabpanel"
                  aria-labelledby="pills-register-tab"
                >
                  <h5 class="text-center">註冊帳戶</h5>

                  <div class="form-group">
                    <label for="name">用戶名</label>
                    <input
                      type="text"
                      v-model="name"
                      class="form-control"
                      id="name"
                      placeholder="Your nice name"
                    />
                  </div>

                  <div class="form-group">
                    <label for="email">信箱地址</label>
                    <input
                      type="email"
                      v-model="email"
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">密碼</label>
                    <input
                      type="password"
                      @keyup.enter="register"
                      v-model="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>

                  <div class="form-group">
                    <button class="btn btn-info" @click="register">
                      註冊
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { auth } from '@/firebase/config';
import $ from 'jquery';

export default {
  name: 'Login',
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    register() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $('#login').modal('hide');
          this.$router.push('admin');
        })
        .catch((err) => {
          // 錯誤處理
          const errorCode = err.code;
          const errorMessage = err.message;
          if (errorCode === 'auth/weak-password') {
            alert('需要至少6位數密碼');
          } else {
            alert(errorMessage);
          }
          console.log(err);
        });
    },
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // console.log(auth);
          $('#login').modal('hide');
          this.$router.push('admin');
        })
        .catch((err) => {
          // 錯誤處理
          const errorCode = err.code;
          const errorMessage = err.message;
          if (errorCode === 'auth/wrong-password') {
            alert('密碼錯誤');
          } else {
            alert(errorMessage);
          }
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>

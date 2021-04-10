<template>
    <div class="login">
      <Loading v-if="loading" />
      <div
        class="modal fade"
        id="login"
        tabindex="-1"
        role="dialog"
        aria-labelledby="loginTitle"
        aria-hidden="true"
        data-backdrop="true"
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
                      placeholder="請輸入信箱"
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
                      placeholder="請輸入密碼"
                    />
                  </div>

                  <div class="form-group">
                    <button class="btn btn-info w-100" @click="login">登入</button>
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
                      placeholder="請輸入用戶名"
                      required
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
                      placeholder="請輸入信箱"
                      required
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
                      placeholder="請輸入密碼"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <button class="btn btn-info w-100"  @click="register">
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
import { auth, db } from '@/firebase/config';
import $ from 'jquery';
import Loading from '@/components/Loading.vue';

export default {
  name: 'Login',
  components: {
    Loading,
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          db.collection('profiles').doc(user.user.uid).set({
            name: this.name,
          })
            .then(() => {
              console.log('ok');
              this.$router.push({ name: 'Admin' });
              window.Toast.fire({
                icon: 'success',
                title: '註冊成功',
              });
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
            });
          $('#login').modal('hide');
        })
        .catch((err) => {
          // 錯誤處理
          const errorCode = err.code;
          this.loading = false;
          if (errorCode === 'auth/weak-password') {
            window.Swal.fire({
              title: '密碼強度不足',
              text: '需要至少6位數密碼',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
            });
          }
          if (errorCode === 'auth/email-already-in-use') {
            window.Swal.fire({
              title: '信箱已註冊',
              text: '請填入未註冊過的信箱',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
            });
          } else {
            window.Swal.fire({
              title: '信箱格式錯誤',
              text: '請填寫正確格式',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
            });
          }
          console.log(err);
        });
    },
    login() {
      this.loading = true;
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log(auth);
          $('#login').modal('hide');
          this.$router.push({ name: 'UserProfile' });
          window.Toast.fire({
            icon: 'success',
            title: '登入成功',
          });
          this.loading = false;
        })
        .catch((err) => {
          // 錯誤處理
          const errorCode = err.code;
          this.loading = false;
          if (errorCode === 'auth/wrong-password') {
            window.Swal.fire({
              title: '密碼錯誤',
              text: '請輸入正確密碼',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
            });
          } else {
            window.Swal.fire({
              title: '查無此信箱',
              text: '請輸入正確電子信箱',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
            });
          }
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-pills .nav-link.active {
  border-radius: 0;
}
</style>

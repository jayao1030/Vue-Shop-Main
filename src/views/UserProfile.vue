<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>用戶設定</h3>
            <p>更改您的用戶資料</p>
          </div>
          <div class="col-md-5">
            <img
              src="/img/svg/user-regular.svg"
              width="100"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
              >個人資料</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              id="account-tab"
              data-toggle="tab"
              href="#account"
              role="tab"
              aria-controls="account"
              aria-selected="false"
              >用戶設定</a
            >
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">姓名</label>
                    <input
                      type="text"
                      v-model="profile.name"
                      placeholder="請輸入姓名"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">電話號碼</label>
                    <input
                      type="tel"
                      v-model="profile.phone"
                      placeholder="請輸入電話號碼"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label for="">地址</label>
                    <input
                      type="text"
                      v-model="profile.address"
                      placeholder="請輸入地址"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateProfile"
                      value="保存更新"
                      class="btn btn-outline-info w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade pt-3"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-8">
                  <div class="form-group">
                    <label for="">帳號</label>
                    <input
                      type="text"
                      v-model="account.displayName"
                      placeholder="請輸入使用者帳號"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-8">
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        @change="uploadImage"
                        type="file"
                        class="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label class="custom-file-label" for="inputGroupFile01"
                        >上傳用戶圖像</label
                      >
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mt-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateAccount"
                      value="更新資訊"
                      class="btn btn-outline-info w-100"
                    />
                  </div>
                </div>

                <div class="col-md-6 mt-4">
                  <div class="form-group">
                    <input
                      type="button"
                      @click="resetPassword"
                      value="重置密碼"
                      class="btn btn-outline-danger w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="col-xs-12 mt-5" />
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db, auth } from '@/firebase/config';

export default {
  name: 'UserProfile',
  data() {
    return {
      profile: {
        name: null,
        phone: null,
        address: null,
      },
      account: {
        displayName: null,
        email: null,
        photoURL: null,
      },
    };
  },
  components: {},
  firestore() {
    const user = auth.currentUser;
    return {
      profile: db.collection('profiles').doc(user.uid),
    };
  },
  methods: {
    updateAccount() {
      const user = auth.currentUser;
      user
        .updateProfile({
          displayName: this.account.displayName,
          photoURL: this.account.photoURL,
        })
        .then(() => {
          this.loading = false;
          window.Toast.fire({
            icon: 'success',
            title: 'Your account was updated successfully!',
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },

    resetPassword() {
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          window.Toast.fire({
            icon: 'success',
            title: '已傳送重置密碼到您的信箱!',
          });
        })
        .catch((err) => console.log(err));
    },

    updateProfile() {
      this.$firestore.profile
        .update(this.profile)
        .then(() => {
          window.Toast.fire({
            icon: 'success',
            title: 'Your profile was updated successfully!',
          });
        })
        .catch((err) => console.log(err));
    },

    uploadImage(evt) {
      if (!evt.target.files[0]) {
        return;
      }
      const file = evt.target.files[0];
      const storageRef = fb
        .storage()
        .ref(`profileImg/${Math.random()}_${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.account.photoURL = downloadURL;
          });
        },
      );
    },
  },
  created() {
    const user = auth.currentUser;
    this.account.displayName = user.displayName;
    this.account.photoURL = user.photoURL;
    this.account.email = user.email;
  },
};
</script>

<style>
</style>

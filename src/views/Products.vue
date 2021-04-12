<template>
  <div class="products">
    <Loading v-if="loading" />
    <div class="container">
      <div class="intro">
        <div class="col-md-12">
          <h3>商品管理</h3>
        </div>
        <div class="row justify-content-center align-items-center">
          <div class="table-responsive">
            <button
              @click="addNew"
              class="btn btn-sm btn-info float-right mt-2"
            >
              新增商品
            </button>
            <table class="table table-hover table-light mt-5">
              <thead class=" table-dark bg-dark">
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">商品名</th>
                  <th scope="col">售價</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prod in products" :key="prod.id">
                  <td>{{ prod.category }}</td>
                  <td>{{ prod.name }}</td>
                  <td>NT$ {{ prod.price }}</td>
                  <td>
                    <i
                      @click="editProduct(prod)"
                      class="fas fa-edit"
                      style="cursor: pointer"
                    ></i>
                    <i
                      @click="deleteProduct(prod)"
                      class="fas fa-trash ml-2"
                      style="cursor: pointer"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--     Add new product modal       -->
      <div
        class="modal fade bd-example-modal-xl"
        id="product"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">商品</h5>
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
              <div class="row w-100">
                <div class="form-group col-md-7">
                  <label for="category">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="product.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-7">
                  <label for="name">商品名</label>
                  <input
                    type="text"
                    v-model="product.name"
                    class="form-control"
                    id="name"
                    placeholder="請輸入商品名"
                  />
                  <div class="form-group mt-3">
                    <label for="name">商品介紹</label>
                    <vue-editor v-model="product.description"></vue-editor>
                  </div>
                </div>
                <div class="col-md-5">
                  <label for="price">商品價格</label>
                  <input
                    type="text"
                    v-model="product.price"
                    class="form-control"
                    id="price"
                    placeholder="請輸入金額"
                  />
                  <div class="input-group mt-5">
                    <div class="custom-file">
                      <input
                        @change="uploadImage"
                        type="file"
                        class="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label class="custom-file-label" for="inputGroupFile01"
                        >商品圖片</label
                      >
                    </div>
                  </div>
                  <div class="form-group d-flex mt-3">
                    <div
                      class="p-1"
                      v-for="(image, index) in product.images"
                      :key="index"
                    >
                      <div class="img-wrapp">
                        <img :src="image" alt="image" width="100" />
                        <span
                          class="delete-img"
                          @click="deleteImage(image, index)"
                        >
                          <i class="fas fa-times"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                @click="addProduct"
                class="btn btn-primary"
                v-if="modal === 'new'"
              >
                新增
              </button>
              <button
                type="button"
                @click="updateProduct"
                class="btn btn-primary"
                v-if="modal === 'edit'"
              >
                更新
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from '@/firebase/config';
import { VueEditor } from 'vue2-editor';
import $ from 'jquery';
import Loading from '@/components/Loading.vue';

export default {
  name: 'Products',
  components: {
    VueEditor,
    Loading,
  },
  data() {
    return {
      product: {
        category: null,
        name: null,
        description: null,
        price: null,
        images: [],
      },
      modal: null,
      loading: false,
    };
  },
  firestore() {
    return {
      products: db.collection('products'),
    };
  },
  methods: {
    addNew() {
      this.reset();
      this.modal = 'new';
      $('#product').modal('show');
    },

    addProduct() {
      this.loading = true;
      this.$firestore.products
        .add(this.product)
        .then(() => {
          this.loading = false;
          this.reset();
          this.modal = null;
        })
        .catch((err) => {
          console.error(err);
        });
      $('#product').modal('hide');
      window.Toast.fire({
        icon: 'success',
        title: '商品新增成功!',
      });
    },

    editProduct(product) {
      this.modal = 'edit';
      this.product = product;
      $('#product').modal('show');
    },

    updateProduct() {
      this.loading = true;
      this.$firestore.products
        .doc(this.product.id)
        .update(this.product)
        .then(() => {
          this.loading = false;
          this.reset();
          this.modal = null;
        })
        .catch((err) => {
          console.error(err);
        });

      $('#product').modal('hide');
      window.Toast.fire({
        icon: 'success',
        title: '商品更新成功!',
      });
    },

    deleteProduct(doc) {
      window.Swal.fire({
        title: '確定要刪除嗎?',
        text: '檔案將無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '刪除',
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$firestore.products
            .doc(doc.id)
            .delete()
            .then(() => {
              this.loading = false;
            });

          window.Toast.fire({
            icon: 'success',
            title: '商品已成功刪除!',
          });
        }
      });
    },

    uploadImage(evt) {
      if (!evt.target.files[0]) {
        return;
      }
      const file = evt.target.files[0];
      const storageRef = fb
        .storage()
        .ref(`products/${Math.random()}_${file.name}`);
      this.loading = true;
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
            this.loading = false;
            this.product.images.push(downloadURL);
          });
        },
      );
    },

    deleteImage(img, index) {
      const image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(() => {
          console.log('照片已刪除');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        images: [],
      };
    },
  },
};
</script>

<style>
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}

.table-light td {
  border-color: #ccc;
}

</style>

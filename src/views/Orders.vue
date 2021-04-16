<template>
  <div class="orders">
    <div class="container h-100">
      <Loading v-if="loading" />
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-12">
            <h3>訂單管理</h3>
          </div>
        </div>

        <div class="row h-100 justify-content-center align-items-center mt-3">
          <div class="col-md-4">
            <div class="card  bg-white mb-1 info-card">
              <div class="card-header">
                <h4 class="card-title">總訂單數</h4>
              </div>
              <div class="card-body" style="text-align: center">
                <h2 class="font-weight-bold">{{ orders.length }}</h2>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-white mb-1 info-card">
              <div class="card-header">
                <h4 class="card-title">待付款訂單</h4>
              </div>
              <div class="card-body" style="text-align: center">
                <h2 class="font-weight-bold">{{ ordersPending.length }}</h2>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card bg-white mb-1 info-card">
              <div class="card-header">
                <h4 class="card-title">已完成訂單</h4>
              </div>
              <div class="card-body" style="text-align: center">
                <h2 class="font-weight-bold">{{ ordersDelivered.length }}</h2>
              </div>
            </div>
          </div>
          <div class="table-responsive">
          <table class="table table-hover table-light mt-5">
            <thead class=" table-dark bg-dark">
              <tr>
                <th scope="col">姓名</th>
                <th scope="col">地址</th>
                <th scope="col">訂單狀態</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in orders"
                :key="order.id"
                @click="openOrder(order)"
                style="cursor: pointer"
              >
                <td>{{ order.user.name }}</td>
                <td>{{ order.user.address }}</td>
                <td>
                  <span
                    v-if="order.status === '等待付款'"
                    class="badge badge-pill badge-primary"
                    >{{ order.status }}</span
                  >
                  <span
                    v-if="order.status === '完成訂單'"
                    class="badge badge-pill badge-warning"
                    >{{ order.status }}</span
                  >
                  <span
                    v-if="order.status === '商品已出貨'"
                    class="badge badge-pill badge-info"
                    >{{ order.status }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!--order modal -->
        <div
          class="modal fade"
          id="orderModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="exampleModalLabel">訂單明細</h6>
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
                <ProductCard :products="activeOrder.order" />
                <hr class="col-xs-10 mt-3" />
                <h6>姓名: {{ activeOrder.user.name }}</h6>
                <span>電話號碼: {{ activeOrder.user.phone }}</span>
                <p>
                  <span>地址: {{ activeOrder.user.address }}</span>
                </p>

                <h6 class="text-info mt-2 mb-2">金額合計: NT$ {{ totalPrice }}</h6>
                <hr class="col-xs-12 mt-3" />
                <h6>更改狀態</h6>
                <div class="form-group row">
                  <div class="col-md-6">
                    <input
                      type="radio"
                      id="one"
                      value="完成訂單"
                      v-model="status"
                      class="mr-2"
                    />
                    <label for="one">完成訂單</label>
                    <br />
                    <input
                      type="radio"
                      id="two"
                      value="商品已出貨"
                      v-model="status"
                      class="mr-2"
                    />
                    <label for="two">商品已出貨</label>
                    <br />
                    <input
                      type="radio"
                      id="two"
                      value="等待付款"
                      v-model="status"
                      class="mr-2"
                    />
                    <label for="two">等待付款</label>
                    <br />
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
                  class="btn btn-outline-danger"
                  @click="deleteOrder(activeOrder)"
                >
                  刪除訂單
                </button>
                <button type="button" class="btn btn-info" @click="updateOrder">
                  更新
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { db, auth } from '../firebase/config';
import ProductCard from '../components/ProductCard.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'Orders',
  components: {
    ProductCard,
    Loading,
  },
  data() {
    return {
      loading: false,
      status: null,
      activeOrder: {
        status: null,
        order: [
          {
            description: null,
            id: null,
            images: null,
            name: null,
          },
        ],
        user: {
          address: null,
          id: null,
          name: null,
          phone: null,
        },
      },
    };
  },
  firestore() {
    const user = auth.currentUser;
    return {
      profile: db.collection('profiles').doc(user.uid),
      orders: db.collection('orders'),
    };
  },
  methods: {
    openOrder(order) {
      this.activeOrder = order;
      this.status = order.status;
      $('#orderModal').modal('show');
    },

    updateOrder() {
      this.loading = true;
      this.$firestore.orders
        .doc(this.activeOrder.id)
        .update({
          status: this.status,
        })
        .then(() => {
          this.loading = false;

          window.Toast.fire({
            icon: 'success',
            title: '訂單更新成功!',
          });
        })
        .catch((err) => {
          window.Toast.fire({
            icon: 'error',
            title: 'Error!',
          });

          console.error(err);
        });

      $('#orderModal').modal('hide');
      this.status = null;
    },
    deleteOrder(doc) {
      window.Swal.fire({
        title: '確定刪除嗎?',
        text: '檔案將無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '刪除',
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$firestore.orders
            .doc(doc.id)
            .delete()
            .then(() => {
              this.loading = false;
            });
          window.Toast.fire({
            icon: 'success',
            title: '訂單已成功刪除!',
          });
          $('#orderModal').modal('hide');
        }
      });
    },
  },
  computed: {
    totalPrice() {
      return this.activeOrder.order.reduce((acc, total) => acc + (total.price * total.quantity), 0);
    },

    ordersPending() {
      return this.orders.filter((order) => order.status === '等待付款');
    },

    ordersDelivered() {
      return this.orders.filter((order) => order.status === '完成訂單');
    },
  },
};
</script>

<style lang="scss" scoped>
.info-card {
  transition: transform 0.3s ease;
  max-width: 25rem;
  text-align: center;
  border-radius: 0;
  margin-top: 2rem;
  &:hover {
     transform: scale(1.02);
  }
}
</style>

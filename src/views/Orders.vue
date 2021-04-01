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
          <table class="table table-hover table-white mt-5">
            <thead>
              <tr>
                <th scope="col">姓名</th>
                <th scope="col">地址</th>
                <th scope="col">狀態</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in orders"
                :key="order.id"
                @click="openOrder(order)"
                style="cursor: pointer"
              >
                <th scope="row">{{ order.user.name }}</th>
                <td>{{ order.user.address }}</td>
                <td>
                  <span
                    v-if="order.status === 'pending'"
                    class="badge badge-pill badge-primary"
                    >{{ order.status }}</span
                  >
                  <span
                    v-if="order.status === 'delivered'"
                    class="badge badge-pill badge-success"
                    >{{ order.status }}</span
                  >
                  <span
                    v-if="order.status === 'in-delivery'"
                    class="badge badge-pill badge-info"
                    >{{ order.status }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
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
                <h6 class="modal-title" id="exampleModalLabel">
                  訂單明細
                </h6>
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
                <hr class="col-xs-12 mt-3" />
                <h6 class="text-bold">{{ activeOrder.user.name }}</h6>
                <span>電話號碼: {{ activeOrder.user.phone }}</span>
                <p>
                  <span class="text-info">{{ activeOrder.user.address }}</span
                  >
                </p>

                <hr class="col-xs-12 mt-3" />
                <h6 class="text-info mt-5">總共金額: ${{ totalPrice }}</h6>
                <h6>更改狀態</h6>
                <div class="form-group row">
                  <div class="col-md-6">
                    <input
                      type="radio"
                      id="one"
                      value="delivered"
                      v-model="status"
                      class="mr-2"
                    />
                    <label for="one">已付款</label>
                    <br />
                    <input
                      type="radio"
                      id="two"
                      value="in-delivery"
                      v-model="status"
                      class="mr-2"
                    />
                    <label for="two">商品運送中</label>
                    <br />
                    <input
                      type="radio"
                      id="two"
                      value="pending"
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
                  class="btn btn-warning"
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
    ProductCard, Loading,
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
            title: 'Order status was updated successfully!',
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
        confirmButtonText: '刪除成功',
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
      if (this.activeOrder.order.length === 1) {
        return (
          this.activeOrder.order[0].price * this.activeOrder.order[0].quantity
        );
      }
      return this.activeOrder.order.reduce(
        (a, b) => a.price * a.quantity + b.price * b.quantity,
      );
    },

    ordersPending() {
      return this.orders.filter((order) => order.status === 'pending');
    },

    ordersDelivered() {
      return this.orders.filter((order) => order.status === 'delivered');
    },
  },
};
</script>

<style>

</style>

<template>
  <div class="overview">
    <div class="container h-100">
      <Loading v-if="loading" />
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-12">
            <h3>我的訂單</h3>
          </div>
        </div>
      </div>

      <table class="table table-hover table-white mt-5">
        <thead>
          <tr>
            <th scope="col">姓名</th>
            <th scope="col">地址</th>
            <th scope="col">總共金額</th>
            <th scope="col">訂單狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in myOrders"
            :key="order.id"
            @click="openOrder(order)"
            style="cursor: pointer"
          >
            <th scope="row">{{ order.user.name }}</th>
            <td>{{ order.user.address }}</td>
            <td>${{ totalPrice(order) }}</td>
            <td>
              <span
                v-if="order.status === '等待付款'"
                class="badge badge-pill badge-primary"
                >{{order.status}}</span
              >
              <span
                v-if="order.status === '完成訂單'"
                class="badge badge-pill badge-success"
                >{{order.status}}</span
              >
              <span
                v-if="order.status === '商品已出貨'"
                class="badge badge-pill badge-info"
                >{{order.status}}</span
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="modal fade"
        id="myOrderModal"
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
              <h6 class="text-bold">姓名: {{ activeOrder.user.name }}</h6>
              <span>電話: {{ activeOrder.user.phone }}</span>
              <p>
                <span>地址: {{ activeOrder.user.address }}</span>
              </p>
              <h5 class="text-info">
                總共金額: ${{ totalActiveOrderPrice }}
              </h5>
              <h6 class="text-secondary">
                訂單狀態:
                <span class="badge badge-pill badge-info">{{
                  activeOrder.status='等待付款'
                }}</span>
              </h6>
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
import Loading from '../components/Loading.vue';
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'Overview',
  components: {
    Loading, ProductCard,
  },
  data() {
    return {
      loading: false,
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
      myOrders: db.collection('orders').where('user.id', '==', user.uid),
    };
  },
  methods: {
    totalPrice(order) {
      if (order.order.length === 1) {
        return order.order[0].price * order.order[0].quantity;
      }
      return order.order.reduce((a, b) => a.price * a.quantity + b.price * b.quantity);
    },

    openOrder(order) {
      this.activeOrder = order;
      // console.log(this.activeOrder);
      $('#myOrderModal').modal('show');
    },
  },
  computed: {
    totalActiveOrderPrice() {
      if (this.activeOrder.order.length === 1) {
        return (
          this.activeOrder.order[0].price * this.activeOrder.order[0].quantity
        );
      }
      return this.activeOrder.order.reduce((a, b) => a.price * a.quantity + b.price * b.quantity);
    },
  },
};
</script>

<style>
</style>

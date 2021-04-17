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
    <div class="table-responsive">
       <table class="table table-hover table-light mt-5">
        <thead class=" table-dark bg-dark">
          <tr>
            <th scope="col">姓名</th>
            <th scope="col">地址</th>
            <th scope="col">金額合計</th>
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
            <td>{{ order.user.name }}</td>
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
                class="badge badge-pill badge-warning"
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
    </div>
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
              <h6>姓名: {{ activeOrder.user.name }}</h6>
              <span>電話: {{ activeOrder.user.phone }}</span>
              <p>
                <span>地址: {{ activeOrder.user.address }}</span>
              </p>
              <h5 class="text-info">
                金額合計: NT$ {{ totalActiveOrderPrice }}
              </h5>
              <h6 class="text-secondary">
                訂單狀態:
                <span class="badge badge-pill badge-dark">{{
                  activeOrder.status
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
            images: [],
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
      return order.order.reduce((acc, total) => acc + (total.price * total.quantity), 0);
    },

    openOrder(order) {
      this.activeOrder = order;
      $('#myOrderModal').modal('show');
    },
  },
  computed: {
    totalActiveOrderPrice() {
      return this.activeOrder.order
        .reduce((acc, total) => acc + (total.price * total.quantity), 0);
    },
  },
};
</script>

<style>
</style>

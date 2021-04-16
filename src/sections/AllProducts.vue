<template>
  <section>
    <div class="container center">
      <div class="row">
        <ProductCardModal />
        <div class="col-md-2">
          <!-- 產品列表 -->
          <ul class="list-group text-center mt-5 mb-10">
            <li>
              <a
                href="#"
                @click.prevent="searchText = ''"
                :class="{ active: searchText === '' }"
                class="list-group-item list-group-item-action h6"
                >所有商品</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="searchText = '嬰兒'"
                :class="{ active: searchText === '嬰兒' }"
                class="list-group-item list-group-item-action h6"
                >嬰兒童裝</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="searchText = '幼兒'"
                :class="{ active: searchText === '幼兒' }"
                class="list-group-item list-group-item-action h6"
                >幼兒童裝</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="searchText = '主題'"
                :class="{ active: searchText === '主題' }"
                class="list-group-item list-group-item-action h6"
                >主題童裝</a
              >
            </li>
          </ul>
        </div>
        <div class="col-md-10 mt-md-16 mt-5">
          <div class="row">
            <div
              class="col-lg-4 col-sm-6"
              v-for="product in filterData"
              :key="product.id"
            >
              <div class="product-card card mb-5">
                <div class="show-info"  @click="showDetails(product)">
                  <img
                    class="card-img"
                    :src="product.images[0]"
                    alt="Card image"
                    style="cursor: pointer"
                  />
                  <span class="info">
                    <p>商品詳情</p>
                  </span>
                </div>
                <div class="card-body p-3">
                  <div class="d-flex justify-content-between mb-3">
                      <h3 class="card-title mb-1">
                        {{ product.name }}
                      </h3>
                      <div class="card-price">
                      NT$ {{ product.price }} 元
                      </div>
                  </div>
                   <AddToCart :ProductId="product.id" value="加入購物車" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery';
import { db } from '../firebase/config';
import AddToCart from '../components/AddToCart.vue';
import ProductCardModal from '../components/ProductCardModal.vue';

export default {
  name: 'AllProducts',
  components: {
    AddToCart, ProductCardModal,
  },
  data() {
    return {
      searchText: '',
    };
  },
  firestore() {
    return {
      products: db.collection('products'),
    };
  },
  computed: {
    filterData() {
      if (this.searchText) {
        return this.products.filter((item) => {
          const data = item.category
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  methods: {
    showDetails(product) {
      this.$store.dispatch('setActiveProduct', product);
      $('#productModal').modal('show');
    },
  },
};
</script>

<style lang="scss" scoped >
.list-group {
  position: sticky;
  top: 100px;
  &-item-action {
    color: black;
    padding: 10px;
  }
  &:focus {
    background-color: white;
    color: white;
  }
  & .list-group-item.active {
    z-index: 2;
    color: black;
    background-color: white;
    border-color: black;
    border-bottom: 3px solid black;
    transition: border 0.3s linear;
  }
}

.card-title {
  font-weight:500;
  font-size: 1rem;
  letter-spacing: .1rem;
  text-align: center;
}

@media screen and (min-width:768px) {
  .list-group {
  &-item-action {
    padding: 3px;
   }
 }
}

</style>

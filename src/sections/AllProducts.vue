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
                class="list-group-item list-group-item-action h5"
                >所有商品</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="searchText = '嬰兒'"
                :class="{ active: searchText === '嬰兒' }"
                class="list-group-item list-group-item-action h5"
                >嬰兒童裝</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="searchText = '幼兒'"
                :class="{ active: searchText === '幼兒' }"
                class="list-group-item list-group-item-action h5"
                >幼兒童裝</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="searchText = '主題'"
                :class="{ active: searchText === '主題' }"
                class="list-group-item list-group-item-action h5"
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
                <div class="product-card card border-1 mb-5">
                  <img
                    class="card-img-top card-img"
                    :src="product.images[0]"
                    alt="Card image"
                    @click="showDetails(product)"
                    style="cursor: pointer"
                  />
                  <div class="card-body p-4 text-center">
                    <h3 class="card-title h5 mb-4">
                      {{ product.name }}
                    </h3>
                    <div class="h5" v-if="product.price">
                      $ {{ product.price }} 元
                    </div>
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
import ProductCardModal from '../components/ProductCardModal.vue';

export default {
  name: 'AllProducts',
  components: {
    ProductCardModal,
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

<style lang="scss" scope>
.list-group {
  position: sticky;
  top: 100px;
  &-item-action {
    // border-bottom: 3px solid rgba(0, 0, 0, 0.125);
    color: rgb(0, 0, 0);
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
    transition: border .3s linear;
  }
}
.product-card {
  border: 1px solid #000;
  border-radius: 0;
}
</style>

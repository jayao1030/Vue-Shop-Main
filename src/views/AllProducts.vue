<template>
  <section>
      <div class="row center">
      <ProductCardModal />
        <div class="col-md-2 mt-md-16 mt-15">
          <!-- 產品列表 -->
          <ul class="list-group text-center m-5 mb-10">
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
                @click.prevent="searchText = '童裝'"
                :class="{ active: searchText === '童裝' }"
                class="list-group-item list-group-item-action h5"
                >童裝</a
              >
            </li>
              <li>
              <a
                href="#"
                @click.prevent="searchText = '嬰兒童裝'"
                :class="{ active: searchText === '嬰兒童裝' }"
                class="list-group-item list-group-item-action h5"
                >嬰兒童裝</a
              >
            </li>
          </ul>
        </div>
    <div class="container content">
        <div class="col-md-10 mt-md-16 mt-0">
          <div class="row">
            <div
              class="col-lg-4 col-sm-6"
              v-for="product in filterData"
              :key="product.id"
              data-aos="fade-up"
            >
              <div class="product-card card border-5 mb-6">
                  <img
                    class="card-img-top card-img"
                    :src="product.images[0]"
                    alt="Card image"
                    @click="showDetails(product)"
                     style="cursor: pointer"
                  />
                <div class="card-body p-4 text-center">
                  <h3 class="card-title h5  mb-4">
                    {{ product.name }}
                  </h3>
                    <div class="h5 text-topic" v-if="product.price">
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    color: rgb(0, 0, 0);
    padding: 10px;
  }
  &:focus {
    background-color: rgb(255, 255, 255);
    color: #fff;
  }
  & .list-group-item.active {
    z-index: 2;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    border-color: rgba(0, 0, 0, 0.125);
  }
}

</style>

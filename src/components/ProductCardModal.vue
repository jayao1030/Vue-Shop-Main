<template>
  <div class="card-modal">
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header modalHeader border-0">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mb-5">
            <div class="row">
              <div class="productModal_img col-md-6">
                <carousel
                  class="VueCarousel-slide"
                  :perPage="1"
                  :paginationEnable="false"
                  ref="carousel"
                >
                  <slide v-for="(image, index) in product.images" :key="index">
                    <img
                      :src="image"
                      class="card-img-top p-1 img-logo"
                      alt="image"
                    />
                  </slide>
                </carousel>
              </div>
              <div class="col-md-6 d-flex flex-column justify-content-between align-items-center">
                <div>
                  <span class="border p-1">{{
                    product.category
                  }}</span>
                </div>
                <h5>{{ product.name }}</h5>
                <h5 class="text-danger">${{ product.price }}</h5>
                <p v-html="product.description"></p>
                <div v-if="!buttonLarge" class="d-flex">
                  <button
                    v-if="isAlreadyAdded()"
                    class="btn btn-secondary btn-sm"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i> 已加入購物車
                  </button>
                  <button
                    v-else
                    class="btn btn-primary"
                    @click="addToCart()"
                  >
                    加入購物車
                  </button>
                </div>
                <div v-else>
                  <button
                    v-if="isAlreadyAdded()"
                    class="btn btn-secondary btn-sm"
                    style="height: 100%"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i> 已加入購物車
                  </button>
                  <button
                    v-else
                    @click="addToCart()"
                    class="btn btn-info px-5"
                    style="height: 100%"
                  >
                    加入購物車
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
import { mapGetters } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
import { db } from '../firebase/config';

export default {
  name: 'ProductCardModal',
  components: {
    Carousel,
    Slide,
  },
  props: {
    buttonLarge: {
      type: Boolean,
      default: false,
    },
  },
  firestore() {
    return {
      products: db.collection('products'),
    };
  },
  computed: {
    ...mapGetters({
      product: 'getActiveProduct',
    }),
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addProduct', this.product);
    },
    isAlreadyAdded() {
      const found = this.$store.state.cart.find(
        (item) => item.id === this.product.id,
      );
      if (found) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.VueCarousel-slide {
  visibility: visible;
  flex-basis: 100%;
  width: 100%;
  height: 430px;
}
</style>

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
          <div class="productModal-body">
            <div class="row d-flex justify-content-center mb-5">
              <div class="productModal-Left col-md-6">
                <div class="productModal-img">
                  <carousel
                  class="VueCarousel-slide"
                  :perPage="1"
                  :paginationEnable="false"
                  ref="carousel"
                >
                  <slide v-for="(image, index) in product.images" :key="index">
                    <img
                      :src="image"
                      class="card-img-top p-1"
                      alt="image"
                    />
                  </slide>
                </carousel>
                </div>
              </div>
              <div class="col-md-6 productModal-Right">
                <div class="productModal-Right-Top">
                   <p class=" p-1 productModal-category ">{{
                    product.category
                  }}</p>
                <p class="productModal-title">{{ product.name }}</p>
                <p class="productModal-price">NT$ {{ product.price }}</p>
                </div>
                <div class="productModal-Right-Center">
                   <p class="productModal-desc" v-html="product.description"></p>
                </div>
                <div class="productModal-Right-Bottom">
                  <div v-if="!buttonLarge" class="d-flex">
                  <button
                    v-if="isAlreadyAdded()"
                    class="btn btn-secondary btn-sm productModal-addtoCart"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i> 已加入購物車
                  </button>
                  <button
                    v-else
                    class="btn btn-primary productModal-addtoCart"
                    @click="addToCart()"
                  >
                    加入購物車
                  </button>
                </div>
                <div v-else>
                  <button
                    v-if="isAlreadyAdded()"
                    class="btn btn-secondary btn-sm productModal-addtoCart"
                    style="height: 100%"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i> 已加入購物車
                  </button>
                  <button
                    v-else
                    @click="addToCart()"
                    class="btn btn-info px-5 productModal-addtoCart"
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

<style lang="scss" >
.VueCarousel-slide {
  visibility: visible;
  flex-basis: 100%;
  width: 100%;
  .VueCarousel-dot-container {
    margin-top: 0;
  }
}
.productModal-body {
  .productModal-Left {
    height: 100%;
    .productModal-img {
      width: 100%;
    }
  }
  .productModal-Right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .productModal-Right-Top {
      .productModal-category {
        font-size: .8rem;
        letter-spacing: .05rem;
        text-align: center;
        border: 1px solid #ccc;
        color: #999;
      }
      .productModal-title {
        font-weight: 700;
        font-size: 1.4rem;
        letter-spacing: .3rem;
        text-align: center;
      }
      .productModal-price {
        font-size: .8rem;
        letter-spacing: .05rem;
        text-align: center;
      }
    }
    .productModal-Right-Center {
      margin-bottom: 5%;
      width: 100%;
      font-size: .8rem;
      letter-spacing: .05rem;
      text-align: center;
    }
    .productModal-Right-Bottom {
      width: 70%;
      .productModal-addtoCart {
        width: 100%;
        padding: 3% 10%;
        font-size: .8rem;
        letter-spacing: .05rem;
        text-align: center;
      }
    }
  }
}

@media screen and (max-width:767px) {
  .productModal-body {
  .productModal-Left {
    display: flex;
    justify-content: center;
    align-items: center;
    .productModal-img {
      width: 50%;
    }
  }
  .productModal-Right {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .productModal-Right-Top {
      margin-top: 3%;
      .productModal-category {
        font-size: .8rem;
        letter-spacing: .05rem;
        text-align: center;
        border: 1px solid #ccc;
        color: #999;
      }
      .productModal-title {
        font-weight: 700;
        font-size: 1.4rem;
        letter-spacing: .3rem;
        text-align: center;
      }
      .productModal-price {
        font-size: .8rem;
        letter-spacing: .05rem;
        text-align: center;
      }
    }
    .productModal-Right-Center {
      margin-bottom: 5%;
      width: auto;
      font-size: .8rem;
      letter-spacing: .05rem;
      text-align: center;
    }
    .productModal-Right-Bottom {
      width: 70%;
      .productModal-addtoCart {
        width: 100%;
        padding: 3% 10%;
        font-size: .8rem;
        letter-spacing: .05rem;
        text-align: center;
      }
    }
  }
}
}

</style>

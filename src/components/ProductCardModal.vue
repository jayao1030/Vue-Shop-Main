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
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.name }}
            </h5>
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
            <div class="row">
              <div class="col-md-3">
                <img :src="product.images[0]" alt="" width="120px" />
              </div>
              <div class="col-md-9">
                <h5>{{ product.name }}</h5>
                <h6 class="text-secondary">${{ product.price }}</h6>
                <p v-html="product.description"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';

export default {
  name: 'ProductCardModal',
  computed: {
    ...mapGetters({
      product: 'getActiveProduct',
    }),
  },
  methods: {
    ...mapActions(['deleteProduct']),

    showDetails(product) {
      this.$store.dispatch('setActiveProduct', product);
      $('#productModal').modal('show');
    },
  },
};
</script>

<style scoped>
</style>

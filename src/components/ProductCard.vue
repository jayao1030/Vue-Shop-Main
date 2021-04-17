<template>
  <div>
    <div
      class="card mt-2 customCard"
      style="width: 100vw"
      v-for="product in products"
      :key="product.id"
    >
      <div class="card-body">
        <div class="row">
          <div class="col-md-7item">
            <img :src="product.images[0]" alt="image" width="100" />
          </div>
          <div class="flex-2 item">
            <h5 class="card-title mb-3 text-center" style="cursor: pointer">
              {{ product.name }}
            </h5>
            <h6 class="card-text text-center">NT$ {{ product.price }}</h6>
            <p class="card-text text-center">數量: {{ product.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width:768px) {
  .customCard {
    max-width: 320px;
    .row {
      display: flex;
      flex-wrap: nowrap;
      .item {
        flex: 1;
      .card-title {
        font-size: 18px;
      }
      .close {
        font-size: 14px;
      }
      }
      .flex-2  {
        flex-grow: 7;
        font-size: 16px;
      }
    }
  }
}
</style>

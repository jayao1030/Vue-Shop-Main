<template>
  <div>
    <div
      class="card mt-2 customCard"
      style="width: 40vw"
      v-for="product in products"
      :key="product.id"
    >
      <div class="card-body">
        <div class="row">
          <div class="col-md-7">
            <img :src="product.images[0]" alt="image" width="100px" />
          </div>
          <div class="col-md-5">
            <h5 class="card-title" style="cursor: pointer">
              {{ product.name }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">${{ product.price }}</h6>
            <p class="card-text">數量: {{ product.quantity }}</p>
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

<style scoped>
.customCard {
  transition: transform 0.2s ease;
  max-width: 450px;
}

.customCard:hover {
  transform: scale(1.01);
}

.add-item {
  cursor: pointer;
  font-weight: bold;
}
</style>

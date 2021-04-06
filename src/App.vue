<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('UPDATE_CART_FROM_LOCALSTORAGE');
  },
};
</script>

<style lang="scss">
@import "./assets/app.scss";
</style>

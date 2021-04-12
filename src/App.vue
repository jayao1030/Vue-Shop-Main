<template>
  <div id="app">
     <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
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

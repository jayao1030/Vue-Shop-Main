<template>
  <header>
    <div class="p-3 px-md-4 bg-white border-bottom shadow-sm fixed-top">
      <div class="container d-flex flex-column flex-md-row align-items-center">
        <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
        <nav class="my-2 my-md-0 mr-md-3">
          <a class="p-2 text-dark" href="#">Features</a>
          <a class="p-2 text-dark" href="#">Enterprise</a>
          <a class="p-2 text-dark" href="#">Support</a>
          <a class="p-2 text-dark" href="#">Pricing</a>
          <a class="btn btn-outline-success my-2 my-sm-0"
            data-toggle="modal" data-target="#login">login</a>
        </nav>
      </div>
    </div>
        <Login />
  </header>
</template>

<script>
import Login from './Login.vue';

export default {
  name: 'Navbar',
  components: {
    Login,
  },

};
</script>

<style>
</style>

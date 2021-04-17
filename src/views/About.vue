<template>
  <div class="about">
    <Navbar />
    <section class="container-fluid px-0">
      <div class="banner-item">
        <img
          class="img-fluid banner"
          src="/img/products/pexels-pixabay-459953.jpg"
          alt="photo"
        />
        <div class="mask" data-aos="fade-right" data-aos-duration="1000">
          <h1>About Us</h1>
        </div>
      </div>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6 p-0" data-aos="fade-right" data-aos-duration="1000">
              <img
                class="img-fluid"
                src="/img/products/pexels-5693888.jpg"
                alt="photo"
              />
          </div>
          <div class="col-6 p-0" data-aos="fade-left" data-aos-duration="1000">
              <h2 class="text-center p-2">關於我們</h2>
              <p class="text-center p-2">我們的目標是透過我們優質的產品及全方位的服務為客戶
                創造安全、便捷、舒適的購物體驗！</p>
          </div>
          <div class="col-6 p-0" data-aos="fade-right" data-aos-duration="1000">
              <p class="text-center p-2">
               在這裡，您可以找到 0-10 歲兒童的嬰兒和兒童服裝、鞋子、玩具、嬰兒車、汽車座椅、配件。
              </p>
          </div>
          <div class="col-6 p-0" data-aos="fade-left" data-aos-duration="1000">
              <img
                class="img-fluid"
                src="/img/products/pexels-5693889.jpg"
                alt="photo"
              />
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer,
  },
};
</script>
<style lang="scss" scoped>
.banner-item {
  position: relative;
  .banner {
    width: 100vw;
  }
  .mask {
    position: absolute;
    top: 30%;
    left: 20%;
    h1 {
    font-size: 4rem;
    color: white;
    letter-spacing: .3rem;
    }
  }
}

@media screen and (max-width:760px) {
  .banner-item {
    position: relative;
    .banner {
      width: 100vw;
      margin-top: 3rem;
    }
    .mask {
      position: absolute;
      top: 50%;
      left: 10%;
      h1 {
        font-size: 2rem;
        color: white;
        letter-spacing: .3rem;
      }
    }
}
h2 {
    font-size: 1.3rem;
  }
  p {
    font-size: 0.5rem;
  }

}

</style>

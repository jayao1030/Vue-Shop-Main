<template>
  <div class="hero container content">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="/img/banner00.jpg"
            class="d-block image-fluid"
            alt="image"
          />
          <div class="carousel-caption d-none d-md-block">
            <h1>嬰兒童裝</h1>
            <p>Some representative placeholder content for the first slide.</p>
            <router-link
              class="btn btn-lg btn-warning"
              :to="{ name: 'ProductsList' }"
              role="button"
              >前往選購</router-link
            >
          </div>
        </div>
        <div class="carousel-item">
          <img src="img/banner01.jpg" class="d-block image-fluid" alt="image" />
          <div class="carousel-caption d-none d-md-block">
            <h1>幼兒童裝</h1>
            <p>Some representative placeholder content for the second slide.</p>
            <router-link
              class="btn btn-lg btn-warning"
              :to="{ name: 'ProductsList' }"
              role="button"
              >前往選購</router-link
            >
          </div>
        </div>
      <div class="carousel-item">
        <img src="img/banner02.jpg" class="d-block image-fluid" alt="image" />
        <div class="carousel-caption d-none d-md-block">
          <h1>派對童裝</h1>
          <p>Some representative placeholder content for the third slide.</p>
          <router-link
            class="btn btn-lg btn-warning"
            :to="{ name: 'ProductsList' }"
            role="button"
            >前往選購</router-link
          >
        </div>
      </div>
      <div>
        <a
          class="carousel-control-prev"
          href="#myCarousel"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#myCarousel"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.carousel-item {
  width: 100%;
  height: 760px;
}
.carousel-item img {
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
  height: 100%;
}
</style>

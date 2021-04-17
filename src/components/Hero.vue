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
          <div class="carousel-caption text-left">
              <div class="mask p-3" data-aos="fade-down" data-aos-duration="800" >
                <h1>嬰兒童裝</h1>
                <p>Mid Season Sale - up to 30%</p>
              </div>
            <router-link
              class="btn btn-lg btn-primary mt-3"
              :to="{ name: 'ProductsList' }"
              role="button"
              >前往選購</router-link
            >
          </div>
        </div>
        <div class="carousel-item">
          <img src="img/banner01.jpg" class="d-block image-fluid" alt="image" />
          <div class="carousel-caption">
            <div class="mask p-3">
              <h1>幼兒童裝</h1>
              <p>Mid Season Sale - up to 30%</p>
            </div>
            <router-link
              class="btn btn-lg btn-primary mt-3"
              :to="{ name: 'ProductsList' }"
              role="button"
              >前往選購</router-link
            >
          </div>
        </div>
        <div class="carousel-item">
          <img src="img/banner02.jpg" class="d-block image-fluid" alt="image" />
          <div class="carousel-caption text-right">
            <div class="mask p-3">
              <h1>主題童裝</h1>
              <p>Mid Season Sale - up to 30%</p>
            </div>
            <router-link
              class="btn btn-lg btn-primary mt-3"
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

<style lang="scss" scoped>
.carousel-item {
  width: 100%;
  height: 640px;

  img {
    position: absolute;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;
    height: 100%;
    opacity: 0.8;
  }
}
/* GLOBAL STYLES
-------------------------------------------------- */
/* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

/* Carousel base class */
/* .carousel {
  margin-bottom: 4rem;
} */
.carousel-caption {
  bottom: 7rem;
  z-index: 10;
  .mask {
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid #000;
    h1 {
      color: black;
      font-size: 3rem;
      letter-spacing: 0.6rem;
    }
  }

  p {
    color: rgb(0, 0, 0);
    font-size: 1.5rem;
  }
}

/* RESPONSIVE CSS
-------------------------------------------------- */

@media (max-width: 768px) {
  /* Bump up size of carousel content */
  .carousel-item {
    width: 100%;
    height: 420px;
    .carousel-caption {
      margin-bottom: -5rem;
      font-size: 0.2rem;
      line-height: 1.4;
      h1 {
        font-size: 2rem;
      }
    }
  }
}

@media (max-width: 500px) {
  /* Bump up size of carousel content */
  .carousel-item {
    width: 100%;
    height: 320px;
    .carousel-caption {
      margin-bottom: -5rem;
      font-size: 0.2rem;
      line-height: 1.4;
      h1 {
        font-size: 2rem;
      }
    }
  }
}
</style>

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
          <div class="carousel-caption text-left mb-5">
            <h1>嬰兒童裝</h1>
            <p>Some representative placeholder content for the first slide.</p>
            <router-link
              class="btn btn-lg btn-primary"
              :to="{ name: 'ProductsList' }"
              role="button"
              >前往選購</router-link
            >
          </div>
        </div>
        <div class="carousel-item">
          <img src="img/banner01.jpg" class="d-block image-fluid" alt="image" />
          <div class="carousel-caption">
            <h1>幼兒童裝</h1>
            <p>Some representative placeholder content for the second slide.</p>
            <router-link
              class="btn btn-lg btn-primary"
              :to="{ name: 'ProductsList' }"
              role="button"
              >前往選購</router-link
            >
          </div>
        </div>
      <div class="carousel-item">
        <img src="img/banner02.jpg" class="d-block image-fluid" alt="image" />
        <div class="carousel-caption text-right mb-5">
          <h1>主題童裝</h1>
          <p>Some representative placeholder content for the third slide.</p>
          <router-link
            class="btn btn-lg btn-primary"
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
  bottom: 3rem;
  z-index: 10;
  h1 {
    color:rgb(34, 44, 47);
    font-size: 3rem;
  }
  p {
    color: white;
  }
}

/* Declare heights because of positioning of img element */
/* .carousel-item {
  height: 32rem;
} */
/* .carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
} */

/* MARKETING CONTENT
-------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 700;
}
.marketing .col-lg-4 p {
  margin-right: .75rem;
  margin-left: .75rem;
}

/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>

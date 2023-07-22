<template>
  <carousel
    :autoplay="5000"
    :items-to-show="1"
    :wrap-around="true"
  >
    <slide
      v-for="image in images.length"
      :key="image"
    >
      <div
        class="carousel__item"
        :style="{
          'background-image': `url(${images[image - 1]})`,
        }"
      ></div>
    </slide>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'


export default {
  name: 'Header',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      images: [
        'https://picsum.photos/800/300?image=0',
        'https://picsum.photos/800/300?image=1',
        'https://picsum.photos/800/300?image=2',
        'https://picsum.photos/800/300?image=3',
        'https://picsum.photos/800/300?image=4',
        'https://picsum.photos/800/300?image=5',
        'https://picsum.photos/800/300?image=6',
        'https://picsum.photos/800/300?image=7',
        'https://picsum.photos/800/300?image=8',
        'https://picsum.photos/800/300?image=9',
        'https://picsum.photos/800/300?image=10',
      ],
    }
  },
}
</script>

<style>
.carousel__item {
  min-height: 240px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  font-size: 20px;
  border-radius: 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.carousel__slide {
  padding: 10px;
}

/*
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
} */
</style>

<template>
  <Carousel v-model="value1">
    <CarouselItem>
      <div class="demo-carousel">1</div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">2</div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel">3</div>
    </CarouselItem>
  </Carousel>
</template>
<script>
export default {
  data() {
    return {
      value1: 0
    };
  }
};
</script>

<style scoped>
.demo-carousel {
  height: 400px;
}
</style>
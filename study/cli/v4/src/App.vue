<template>
  <div id="app">
    <Header />
    <p> 分割线 </p>
    <Foot />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Foot from "./components/Foot.vue";

export default {
  name: 'app',
  components: {
    Header,
    Foot
  }
}
</script>

<style>
</style>

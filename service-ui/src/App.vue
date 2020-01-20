<template>
  <div id="app">
    <router-view />
    <Test />
  </div>
</template>

<script>
import Test from "./Test.vue";

export default {
  components: {
    Test
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
<template>
  <div id="app">
    <Header />
    <HelloWorld :msg="name"/> <!-- 绑定name属性传递 -->
    <Foot />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Foot from "./components/Foot.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: 'app',
  data() {
    return {
      name: 'gongbin'
    };
  },
  components: {
    Header,
    Foot,
    HelloWorld
  }
}
</script>

<style>
</style>

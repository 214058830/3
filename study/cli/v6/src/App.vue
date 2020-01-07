<template>
  <div id="app">
    <Header />
    <!-- 绑定name属性传值 值有两种情况：1.传值(bool、number、string) 2.传引用 (对象、数组)-->
    <HelloWorld :msg="name" :Arr="arr" />
    <p>{{ name }}</p>
    <p>{{ arr }}</p>
    <Foot />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Foot from "./components/Foot.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data() {
    return {
      name: "gongbin",
      arr: ["a", "b", "c"]
    };
  },
  components: {
    Header,
    Foot,
    HelloWorld
  }
};
</script>

<style>
</style>

<!-- 跟组件 -->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <HelloWorld/> <!-- 嵌套局部组件 -->
    <user/>  <!--  使用全局组件 -->
  </div>
</template>

<script>
// 局部组件 import + components
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>

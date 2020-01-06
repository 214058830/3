<!-- 跟组件 -->
<template>
  <div id="app">
    <HelloWorld/>
    <h1>App.vue</h1>
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
  h1 {
    color: purple;
  }
</style>

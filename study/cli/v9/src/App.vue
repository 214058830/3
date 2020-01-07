<template>
  <div id="app">
    <!-- 缓存组件中的内容 -->
    <keep-alive>
      <!-- 用属性component来控制显示哪一个组件 -->
      <component :is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
// import form-one from ***;
// import form-two from ***;

export default {
  name: "app",
  data() {
    return {
      component: "form-one"
    };
  },
  components: {
    // form-one,
    // form-two
  },
  methods: {}
};
</script>

<style>
</style>

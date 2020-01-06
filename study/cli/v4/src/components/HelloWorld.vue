<template>
<!-- HTML结构：只能有一个跟标签 -->
  <div id="HelloWorld">
    <h1>{{ msg }}</h1>
    <p>{{ greeting() }}</p>
  </div>
</template>

<script>
// js 部分 逻辑部分
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // }
  data() {
    return {
      msg: 'gongbin'
    };
  },
  methods: {
    greeting() {
      return `hello ${this.msg}`;
    }
  }
}
</script>

<style scoped> /* scoped这个参数指示 style只针对所在组件渲染 */
/* CSS 样式部分 */
h1 {
  color: green;
}
</style>

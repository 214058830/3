<template>
<!-- HTML结构：只能有一个跟标签 -->
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// js 部分 逻辑部分
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* CSS 样式部分 */
</style>

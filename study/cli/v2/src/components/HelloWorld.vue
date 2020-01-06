<template>
<!-- HTML结构：只能有一个跟标签 -->
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{greeting()}}</p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* CSS 样式部分 */
</style>

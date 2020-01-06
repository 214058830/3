<template>
  <div id="HelloWorld">
  <h1> HelloWorld </h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: ["msg", "msg2", "msg3"],
  props: {
    msg: String,
    msg2: {
      type: Array,
      required: false // 标志必须传递参数  默认false
    }
  },
  data() {
    return {};
  }
}
</script>

<style scoped>
</style>

<template>
  <div id="HelloWorld">
    <h1>HelloWorld</h1>
    <p>{{ msg }}</p>
    <p>{{ Arr }}</p>
    <button @click="deletedMsg">delete</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  // props: ["msg", "msg2", "msg3"],
  props: {
    msg: String,
    Arr: {
      type: Array,
      required: true // 标志必须传递参数  默认false
    }
  },
  data() {
    return {};
  },
  methods: {
    deletedMsg() {
      this.msg = "hehe";
      this.Arr.pop();
    }
  }
};
</script>

<style scoped>
</style>

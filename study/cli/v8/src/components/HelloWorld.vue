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
      // 直接修改会报警告
      // this.msg = "hehe";
      // this.Arr.pop();
      // 注册事件 参数1 名称 参数2  ...值
      this.$emit("changeMsg", "hhhhhh");
    }
  }
};
</script>

<style scoped>
</style>

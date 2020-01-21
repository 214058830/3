<template>
  <button @click="fun()">test</button>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    fun() {
      this.axios
        .get("http://localhost:8081/session") //请求接口
        .then(response => {
          console.log(response.data);
          console.log(response.status + " " + response.statusText);
        });
    }
  },
  mounted() {
    // 测试函数
    console.log("[test]: " + process.env.VUE_APP_BASE_URL);
    console.log("[test]: " + process.env.VUE_APP_VERSION);
  }
};
</script>

<style scoped>
</style>
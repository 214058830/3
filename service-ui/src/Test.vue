<template>
  <p>test</p>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 测试函数
    console.log("test: " + process.env.VUE_APP_BASE_URL);
    console.log("test: " + process.env.VUE_APP_VERSION);
  }
};
</script>

<style scoped>
</style>
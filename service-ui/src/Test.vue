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
    console.log(process.env.VUE_APP_BASE_URL);
    console.log(process.env.VUE_APP_VERSION);
    console.log(this.GLOBAL.user_mail);
    console.log(this.GLOBAL.hasEnter);
  }
};
</script>

<style scoped>
</style>
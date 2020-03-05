<template>
  <router-view :username="username" :mail="mail" :flag="flag" :logo="logo" />
</template>

<script>
export default {
  props: {
    username: String,
    mail: String,
    flag: String,
    logo: String
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style scoped>
</style>
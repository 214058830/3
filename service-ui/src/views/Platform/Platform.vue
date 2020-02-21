<template>
  <router-view :username="username" :mail="mail" />
</template>

<script>
export default {
  props: {
    username: String,
    mail: String
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
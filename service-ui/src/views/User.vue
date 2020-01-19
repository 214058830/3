<template>
  <div>
    <h1>This is an user page</h1>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    info() {
      this.$Message.info("这是一条普通的提醒");
    }
  }
};
</script>
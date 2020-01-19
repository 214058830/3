<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
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
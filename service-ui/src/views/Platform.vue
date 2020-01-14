<template>
  <div>
    <Header />
    <h1>This is an platform page</h1>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

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
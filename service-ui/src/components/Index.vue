<template>
  <div>
    <Header :flag="flag" />
    <router-view @changeFlag="updataFlag"></router-view>
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
    return {
      flag: sessionStorage.flag // 标记用户是否登录
    };
  },
  methods: {
    updataFlag(flag) {
      sessionStorage.flag = flag;
      this.flag = sessionStorage.flag;
    }
  }
};
</script>
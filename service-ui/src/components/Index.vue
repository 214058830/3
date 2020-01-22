<template>
  <div>
    <Header :flag="flag" :mail="mail" @logout="logout" />
    <router-view @changeFlag="updataFlag" @changeUserInfo="updataUserInfo"></router-view>
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
      flag: sessionStorage.flag, // 标记用户是否登录
      mail: sessionStorage.mail,
      password: sessionStorage.password
    };
  },
  methods: {
    // 更新登录标志 参数[bool]
    updataFlag(flag) {
      sessionStorage.flag = flag;
      this.flag = sessionStorage.flag;
    },
    // 更新用户sessionStorage信息 页面关闭会自动丢失 参数: [String, String]
    updataUserInfo(mail, password) {
      sessionStorage.mail = mail;
      this.mail = sessionStorage.mail;
      sessionStorage.password = password;
      this.password = sessionStorage.password;
    },
    // 退出账号 参数: [bool]
    logout(flag) {
      this.updataUserInfo("", "");
      this.updataFlag(flag);
    }
  }
};
</script>
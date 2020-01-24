<template>
  <div>
    <Header :flag="flag" :mail="mail" @logout="logout" />
    <router-view
      @changeFlag="updataFlag"
      @updataUserInfo="updataUserInfo"
      :id="id"
      :username="username"
      :password="password"
    ></router-view>
    <Footer />
    <BackTop></BackTop>
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
      id: sessionStorage.id,
      mail: sessionStorage.mail,
      username: sessionStorage.username,
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
    updataUserInfo(type, data) {
      if (type == "id") {
        sessionStorage.id = data;
        this.id = sessionStorage.id;
      } else if (type == "mail") {
        sessionStorage.mail = data;
        this.mail = sessionStorage.mail;
      } else if (type == "username") {
        sessionStorage.username = data;
        this.username = sessionStorage.username;
      } else {
        sessionStorage.password = data;
        this.password = sessionStorage.password;
      }
    },
    // 退出账号 参数: [bool]
    logout(flag) {
      this.updataUserInfo("", "");
      this.updataFlag(flag);
    }
  }
};
</script>
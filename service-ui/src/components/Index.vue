<template>
  <div>
    <Header
      :key="menuKey"
      :flag="flag"
      :logo="logo"
      :mail="mail"
      :paramActiveMenu="paramActiveMenu"
      @logout="logout"
    />
    <router-view
      @changeFlag="updataFlag"
      @updataUserInfo="updataUserInfo"
      @updataParamActiveMenu="updataParamActiveMenu"
      :id="id"
      :username="username"
      :password="password"
      :mail="mail"
      :logo="logo"
      :flag="flag"
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
      menuKey: true,
      paramActiveMenu: "", // 传递给header的参数 代表重定向，让header栏重新更新值
      flag: sessionStorage.flag, // 标记用户是否登录
      logo: sessionStorage.logo, // 管理员标志
      id: sessionStorage.id,
      mail: sessionStorage.mail,
      username: sessionStorage.username,
      password: sessionStorage.password
    };
  },
  methods: {
    // 更新登录标志 参数: [true/false]
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
      } else if (type == "logo") {
        sessionStorage.logo = data;
        this.logo = sessionStorage.logo;
      } else {
        sessionStorage.password = data;
        this.password = sessionStorage.password;
      }
    },
    // 退出账号 参数: [bool]
    logout(flag) {
      var arr = ["id", "mail", "username", "logo", "password"];
      arr.forEach(item => {
        this.updataUserInfo(item, "");
      });
      this.updataFlag(flag);
    },
    updataParamActiveMenu(val) {
      this.paramActiveMenu = val;
      this.$nextTick(() => {
        this.menuKey = !this.menuKey;
        this.paramActiveMenu = "";
      });
    }
  }
};
</script>
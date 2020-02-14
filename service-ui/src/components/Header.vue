<template>
  <div class="layout">
    <Menu
      mode="horizontal"
      @on-select="updataActiveMenu"
      :theme="theme"
      :active-name="activemenu"
      style="height: 80px; line-height:80px"
    >
      <Row>
        <Col span="1">
          <img src="../assets/logo.png" style="transform: translateY(+35%); margin-left: 150px" />
        </Col>
        <Col span="23">
          <div class="layout-menu">
            <Menu-item name="home" to="/">首页</Menu-item>
            <Menu-item name="water" to="/water">水利信息系统</Menu-item>
            <Menu-item name="user" to="/user" v-if="this.logo == 'true'">用户管理</Menu-item>
            <Menu-item name="platform" to="/platform">论坛</Menu-item>
          </div>
          <div class="layout-center" v-if="this.flag === 'true'">
            <Submenu name="mail">
              <template slot="title">
                <span style="font-size: 16px;">你好， {{ this.mail }}</span>
              </template>
              <MenuItem id="layout-menuItem" name="center" to="/center">
                <Icon type="ios-contact-outline" size="18" />&nbsp;个人中心
              </MenuItem>
              <MenuItem id="layout-menuItem" name="logout" @click.native="logout">
                <Icon type="ios-log-out" size="18" />&nbsp;退出
              </MenuItem>
              <hr
                style="border: 1 dashed #987cb9;"
                width="90%"
                align="center"
                color="#e8eaec"
                size="1"
              />
              <MenuItem id="layout-menuItem" name="3-4">
                <Icon type="ios-create-outline" size="18" />&nbsp;发帖
              </MenuItem>
            </Submenu>
          </div>
          <div class="layout-center" v-else>
            <Menu-item name="register" to="/register">注册</Menu-item>
            <Menu-item name="login" to="/login">登录</Menu-item>
          </div>
        </Col>
      </Row>
    </Menu>
  </div>
</template>

<script>
export default {
  props: {
    flag: String,
    logo: String,
    mail: String,
    paramActiveMenu: String
  },
  data() {
    return {
      activemenu: sessionStorage.activemenu, // 默认激活子菜单
      theme: "light" // 导航栏主题色彩
    };
  },
  methods: {
    logout() {
      this.$emit("logout", "false");
      this.$router.push({ path: "/" });
    },
    updataActiveMenu(name) {
      sessionStorage.activemenu = name;
    },
    init() {
      if (sessionStorage.activemenu == undefined) {
        sessionStorage.activemenu = "home";
        this.activemenu = sessionStorage.activemenu;
      }
    }
  },
  watch: {
    // 更新本地sessionStorage
    paramActiveMenu: function(val) {
      sessionStorage.activemenu = val;
    }
  },
  computed: {},
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.layout-menu {
  float: left;
  margin-left: 180px;
}
.layout-center {
  float: right;
  margin-right: 100px;
}
#layout-menuItem {
  height: 40px;
  margin-left: 8px;
}
</style>
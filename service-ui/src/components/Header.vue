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
            <Dropdown style="margin-right: 20px" @on-click="mail_drop">
              <a href="javascript:void(0)">
                <Icon type="ios-notifications-outline" size="18" />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>公告&nbsp;(3)</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown @on-click="mail_drop">
              <a style="font-size: 16px;" href="javascript:void(0)">
                你好，{{this.mail}}
                <Icon type="ios-arrow-down" size="18" />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="center" id="layout-dropdownItem">
                  <Icon type="ios-contact-outline" size="18" />&nbsp;个人中心
                </DropdownItem>
                <DropdownItem name="logout" id="layout-dropdownItem">
                  <Icon type="ios-log-out" size="18" />&nbsp;退出
                </DropdownItem>
                <DropdownItem divided name="my_article" id="layout-dropdownItem">
                  <Icon type="ios-image-outline" size="18" />&nbsp;我的帖子
                </DropdownItem>
                <DropdownItem name="create_article" id="layout-dropdownItem">
                  <Icon type="ios-create-outline" size="18" />&nbsp;发帖
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
    mail_drop(name) {
      if (name == "center") {
        this.$router.push({ path: "/center" });
      } else if (name == "logout") {
        this.logout();
      } else if (name == "my_article") {
        this.$router.push({ path: "/platform/inquire_my_article" });
      } else {
        this.$router.push({ path: "/platform/create_article" });
      }
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
#layout-dropdownItem {
  height: 40px;
  margin-left: 8px;
}
</style>
<template>
  <div class="layout">
    <Menu
      mode="horizontal"
      :theme="theme"
      :active-name="activemenu"
      style="height: 90px; 
      line-height:90px"
    >
      <div class="layout-menu">
        <Menu-item name="logo" to="/">
          <img style="margin-top: 20px" src="../assets/logo.png" />
        </Menu-item>
        <Menu-item name="home" to="/">首页</Menu-item>
        <Menu-item name="water" to="/water">水利信息系统</Menu-item>
        <Menu-item name="user" to="/user" v-if="this.mail == 'admin@qq.com'">用户管理</Menu-item>
        <Menu-item name="platform" to="/platform">论坛</Menu-item>
      </div>
      <div class="layout-registered" v-if="this.flag === 'true'">
        <Dropdown
          trigger="custom"
          :visible="visible"
          style="margin-right: 20px; cursor:pointer"
          placement="bottom-end"
        >
          <div class="layout-center" @click="handleOpenAndClose">
            你好， {{ this.mail }}
            <!-- <Icon type="arrow-down-b"></Icon> -->
            <Icon type="ios-arrow-up" v-if="this.visible" />
            <Icon type="ios-arrow-down" v-else />
          </div>
          <Dropdown-menu slot="list" style="width: 240px; margin-left: 30px">
            <div style="height: 50px; margin-top: -10px" @click="center">
              <Avatar icon="ios-person" size="small" />&thinsp; 个人中心
            </div>
            <div style="height: 60px; font-size: 16px" @click="logout">
              退出
              <Icon size="20" type="ios-power" style="margin-left: 150px" />
            </div>
          </Dropdown-menu>
        </Dropdown>
      </div>
      <div class="layout-registered" v-else>
        <Menu-item name="register" to="/register">注册</Menu-item>
        <Menu-item name="login" to="/login">登录</Menu-item>
      </div>
    </Menu>
  </div>
</template>

<script>
export default {
  props: {
    flag: String,
    mail: String
  },
  data() {
    return {
      visible: false, // 子菜单开关
      activemenu: "water", // 默认激活子菜单
      theme: "primary" // 导航栏主题色彩
    };
  },
  methods: {
    // 控制个人中心菜单
    handleOpenAndClose() {
      this.visible = !this.visible;
    },
    logout() {
      this.$emit("logout", "false");
    },
    center() {
      this.handleOpenAndClose();
      this.$router.push({ path: "/center" });
    }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.layout-menu {
  float: left;
  margin-left: 100px;
}
.layout-registered {
  float: right;
  margin-right: 100px;
}
.layout-center {
  font-size: 16px;
  color: white;
}
</style>
<template>
  <div class="layout">
    <Menu mode="horizontal" :theme="theme" :active-name="activemenu">
      <div class="layout-menu">
        <Menu-item name="/water" to="/water">
          <Icon type="md-home" />SUST水利信息系统
        </Menu-item>
        <Menu-item name="/user" to="/user">
          <Icon type="ios-people" />用户管理
        </Menu-item>
        <Menu-item name="/platform" to="/platform">
          <Icon type="ios-cafe" />论坛
        </Menu-item>
      </div>
      <div class="layout-registered">
        <Menu-item name="/register" to="register">注册</Menu-item>
        <Menu-item name="/login" to="login">登录</Menu-item>
      </div>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activemenu: "/water", // 默认激活子菜单
      theme: "primary" // 导航栏主题色彩
    };
  },
  methods: {},
  watch: {},
  computed: {}
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
</style>
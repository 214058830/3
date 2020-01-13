<template>
  <div class="layout">
    <Menu mode="horizontal" :theme="theme" active-name="s1">
      <div class="layout-menu">
        <Menu-item name="s1" router-link to="/">
          <Icon type="md-home" />SUST水利信息系统
        </Menu-item>
        <Menu-item name="s2" router-link to="/user">
          <Icon type="ios-people" />用户管理
        </Menu-item>
        <Menu-item name="s3" router-link to="/platform">
          <Icon type="ios-cafe" />论坛
        </Menu-item>
      </div>
      <div class="layout-registered">
        <Menu-item name="s4" router-link to="/register">注册</Menu-item>
        <Menu-item name="s5" router-link to="/login">登录</Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <router-view />
    </div>
    <div class="layout-copy">2020 &copy; GongBin</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light" // 导航栏主题色彩
    };
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
  margin-left: 100px;
}
.layout-registered {
  float: right;
  margin-right: 100px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
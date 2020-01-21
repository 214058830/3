<template>
  <div class="layout">
    <Menu mode="horizontal" :theme="theme" :active-name="activemenu">
      <div class="layout-menu">
        <Menu-item name="water" to="/">
          <Icon type="md-home" />SUST水利信息系统
        </Menu-item>
        <Menu-item name="user" to="/user">
          <Icon type="ios-people" />用户管理
        </Menu-item>
        <Menu-item name="platform" to="/platform">
          <Icon type="ios-cafe" />论坛
        </Menu-item>
      </div>
      <div class="layout-registered" v-if="this.flag === 'true'">
        <Dropdown trigger="custom" :visible="visible" style="margin-left: 20px">
          <a href="javascript:void(0)" @click="handleOpen">
            custom 触发
            <Icon type="arrow-down-b"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <p>常用于各种自定义下拉内容的场景。</p>
            <div style="text-align: right;margin:10px;">
              <i-button type="primary" @click="handleClose">关闭</i-button>
            </div>
          </Dropdown-menu>
        </Dropdown>
        <!-- <Menu-item name="login" to="/login">账号</Menu-item> -->
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
    flag: String
  },
  data() {
    return {
      visible: false,
      activemenu: "water", // 默认激活子菜单
      theme: "primary" // 导航栏主题色彩
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
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
</style>
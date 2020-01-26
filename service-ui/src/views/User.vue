<template>
  <div class="layout-content">
    <Row>
      <Col span="6">
        <Menu :active-name="MenuItem" @on-select="selectMenuItem">
          <Menu-group title="用户信息管理">
            <Menu-item name="s1-1">
              <Icon type="document-text"></Icon>录入信息
            </Menu-item>
          </Menu-group>
          <Menu-group title="用户权限管理">
            <Menu-item name="s2-1">
              <Icon type="heart"></Icon>权限管理
            </Menu-item>
          </Menu-group>
        </Menu>
      </Col>
      <Col span="18">
        <div v-show="MenuItem == 's1-1'">
          <p>s1-1</p>
        </div>
        <div v-show="MenuItem == 's2-1'">
          <p>s2-1</p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      MenuItem: "s1-1"
    };
  },
  methods: {
    selectMenuItem(name) {
      this.MenuItem = name;
    }
  },
  mounted() {}
};
</script>

<style scoped>
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
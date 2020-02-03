<template>
  <div class="layout-content">
    <Row>
      <Col span="6">
        <Menu :active-name="MenuItem" @on-select="selectMenuItem">
          <Menu-group title="水利信息查询">
            <Menu-item name="s1-1">
              <Icon type="document-text"></Icon>查询余额
            </Menu-item>
          </Menu-group>
          <Menu-group title="水利信息更改">
            <Menu-item name="s2-1">
              <Icon type="heart"></Icon>录入信息
            </Menu-item>
            <Menu-item name="s2-2">
              <Icon type="heart-broken"></Icon>修改信息
            </Menu-item>
          </Menu-group>
        </Menu>
      </Col>
      <Col span="18">
        <div v-show="MenuItem == 's1-1'">
          <router-view :logo="logo" :mail="mail" />
        </div>
        <div v-show="MenuItem == 's2-1'">
          <p>s2-1</p>
        </div>
        <div v-show="MenuItem == 's2-2'">
          <p>s2-2</p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import QueryAmount from "./QueryAmount";

export default {
  props: {
    mail: String,
    logo: String,
    flag: String
  },
  components: { QueryAmount },
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
  mounted() {
    if (this.flag == "false") {
      this.$router.push({ path: "/login" });
    }
  }
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
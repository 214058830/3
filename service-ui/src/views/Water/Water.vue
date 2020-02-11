<template>
  <div class="layout-content">
    <Row>
      <Col span="6">
        <Menu :active-name="MenuItem" @on-select="selectMenuItem">
          <Menu-group title="水利信息查询">
            <Menu-item name="s1-1">
              <Icon type="document-text"></Icon>余额
            </Menu-item>
          </Menu-group>
          <Menu-group title="水利信息更改">
            <Menu-item name="s2-1">
              <Icon type="heart"></Icon>录入信息
            </Menu-item>
            <Menu-item name="s2-2" v-if="this.logo == 'true'">
              <Icon type="heart-broken"></Icon>修改信息
            </Menu-item>
          </Menu-group>
        </Menu>
      </Col>
      <Col span="18">
        <router-view :logo="logo" :mail="mail" :flag="flag" />
      </Col>
    </Row>
  </div>
</template>

<script>
import AddInfo from "./AddInfo/AddInfo";
import Alter from "./Alter/Alter";

export default {
  props: {
    mail: String,
    logo: String,
    flag: String
  },
  components: { AddInfo, Alter },
  data() {
    return {
      MenuItem: "s1-1"
    };
  },
  methods: {
    selectMenuItem(name) {
      this.MenuItem = name;
      if (this.MenuItem == "s1-1") {
        this.$router.push({ path: "/water/query_amount" });
      } else if (this.MenuItem == "s2-1") {
        this.$router.push({ path: "/water/add_info" });
      } else if (this.MenuItem == "s2-2") {
        this.$router.push({ path: "/water/alter" });
      }
    }
  },
  mounted() {
    if (this.flag != "true") {
      this.$router.replace({ path: "/login" });
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